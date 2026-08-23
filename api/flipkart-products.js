
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST method required' });
  }

  const affiliateId = process.env.FLIPKART_AFFILIATE_ID;
  const affiliateToken = process.env.FLIPKART_AFFILIATE_TOKEN;

  if (!affiliateId || !affiliateToken) {
    return res.status(500).json({
      error: 'Flipkart Affiliate API credentials are not configured on the server.'
    });
  }

  try {
    const urls = Array.isArray(req.body?.urls) ? req.body.urls : [];
    const cleanUrls = [...new Set(urls.map(v => String(v || '').trim()).filter(Boolean))];

    if (!cleanUrls.length) {
      return res.status(400).json({ error: 'No Flipkart product URLs supplied.' });
    }
    if (cleanUrls.length > 100) {
      return res.status(400).json({ error: 'Maximum 100 URLs per request.' });
    }

    const results = [];
    const errors = [];

    // Flipkart documents a 20 requests/sec affiliate API limit.
    // A small sequential worker keeps this comfortably below the limit.
    for (const url of cleanUrls) {
      try {
        if (!/^https?:\/\/(www\.)?flipkart\.com\//i.test(url)) {
          throw new Error('Invalid Flipkart URL');
        }

        const productId = extractProductId(url);
        if (!productId) {
          throw new Error('Product ID could not be extracted from this URL');
        }

        const apiUrl = new URL('https://affiliate-api.flipkart.net/affiliate/1.0/product.json');
        apiUrl.searchParams.set('id', productId);

        const fkResponse = await fetch(apiUrl, {
          headers: {
            'Fk-Affiliate-Id': affiliateId,
            'Fk-Affiliate-Token': affiliateToken,
            'Accept': 'application/json'
          }
        });

        const text = await fkResponse.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(`Flipkart returned non-JSON response (${fkResponse.status})`);
        }

        if (!fkResponse.ok) {
          throw new Error(data?.error || data?.message || `Flipkart API error ${fkResponse.status}`);
        }

        const mapped = mapFlipkartProduct(data, url);
        if (!mapped.name) {
          throw new Error('Product details were not returned by Flipkart');
        }

        results.push(mapped);
      } catch (error) {
        errors.push({ url, error: error?.message || String(error) });
      }
    }

    return res.status(200).json({ products: results, errors });
  } catch (error) {
    console.error('Flipkart importer error:', error);
    return res.status(500).json({ error: error?.message || 'Flipkart import failed' });
  }
}

function extractProductId(url) {
  try {
    const u = new URL(url);
    const pathMatch = u.pathname.match(/\/p\/([A-Za-z0-9]+)/i);
    if (pathMatch?.[1]) return pathMatch[1];
    const pid = u.searchParams.get('pid');
    if (pid) return pid;
  } catch {}

  const match = String(url).match(/\/p\/([A-Za-z0-9]+)/i);
  return match?.[1] || '';
}

function mapFlipkartProduct(data, sourceUrl) {
  const base = data?.productBaseInfoV1 || data?.productBaseInfo || {};
  const shipping = data?.productShippingInfoV1 || data?.productShippingInfo || {};

  const imageUrls = base.imageUrls || {};
  const images = Object.values(imageUrls)
    .map(v => String(v || '').trim())
    .filter(Boolean);

  const category = getCategory(base.categoryPaths);
  const sellingPrice = number(base.flipkartSellingPrice ?? base.sellingPrice ?? base.price);
  const specialPrice = number(base.flipkartSpecialPrice ?? base.specialPrice);
  const mrp = number(base.maximumRetailPrice ?? base.mrp);

  return {
    name: base.title || '',
    brand: base.productBrand || '',
    category,
    description: base.productDescription || '',
    flipkart_price: specialPrice || sellingPrice || 0,
    mrp: mrp || 0,
    main_image: images[0] || '',
    images,
    productUrl: sourceUrl,
    source_url: sourceUrl,
    stock_status: base.inStock === false ? 'out_of_stock' : 'stock',
    // These are defaults for fields not supplied by the Flipkart product API.
    stock: base.inStock === false ? 0 : 10,
    cod_enabled: base.codAvailable !== false,
    return_enabled: true,
    return_days: 10,
    assured_enabled: true,
    customize_enabled: false,
    badge: '',
    is_active: base.isAvailable !== false,
    highlights: buildHighlights(base),
    all_details: buildDetails(base, shipping)
  };
}

function getCategory(categoryPaths) {
  if (!categoryPaths) return 'Electronics';
  const paths = Array.isArray(categoryPaths) ? categoryPaths : Object.values(categoryPaths);
  const first = paths[0];
  if (typeof first === 'string') return first.split('>').filter(Boolean).pop()?.trim() || 'Electronics';
  if (first?.title) return String(first.title).split('>').filter(Boolean).pop()?.trim() || 'Electronics';
  if (first?.categoryPath) return String(first.categoryPath).split('>').filter(Boolean).pop()?.trim() || 'Electronics';
  return 'Electronics';
}

function buildHighlights(base) {
  const out = [];
  if (base.productBrand) out.push({ icon: '✓', label: 'Brand', value: String(base.productBrand), color: '#111111' });
  if (base.color) out.push({ icon: '✓', label: 'Color', value: String(base.color), color: '#111111' });
  if (base.size) out.push({ icon: '✓', label: 'Size', value: String(base.size), color: '#111111' });
  if (base.discount) out.push({ icon: '✓', label: 'Discount', value: String(base.discount), color: '#111111' });
  return out;
}

function buildDetails(base, shipping) {
  const rows = [];
  if (base.productId) rows.push({ key: 'Flipkart Product ID', value: String(base.productId) });
  if (base.productBrand) rows.push({ key: 'Brand', value: String(base.productBrand) });
  if (base.color) rows.push({ key: 'Color', value: String(base.color) });
  if (base.size) rows.push({ key: 'Size', value: String(base.size) });
  if (base.styleCode) rows.push({ key: 'Style Code', value: String(base.styleCode) });
  if (shipping?.shippingBaseInfo) rows.push({ key: 'Shipping Info', value: String(shipping.shippingBaseInfo) });
  return rows.length ? [{ title: 'Product Details', rows }] : [];
}

function number(value) {
  const n = Number(String(value ?? '').replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : 0;
}
