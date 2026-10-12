import ProductDetailNoMedia from './ProductDetailNoMedia'
export default async function InventoryProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <ProductDetailNoMedia slug={slug}/>}
