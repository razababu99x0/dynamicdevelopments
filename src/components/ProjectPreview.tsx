const previews: Record<string, {src:string;alt:string}> = {
 physics: {src:'/physics-portfolio.jpg',alt:'Screenshot of the live Semester One physics book'},
 bit: {src:'/bit-portfolio.jpg',alt:'Screenshot of the live BIT Ghosi institute website'},
 vmart: {src:'/vmart-portfolio.jpg',alt:'Screenshot of the deployed V-Mart Siwan Edition Two storefront'},
};
export default function Preview({kind}:{kind:string}){
 const preview=previews[kind];
 if(!preview)return null;
 return <div className="project-art" style={{padding:0,overflow:'hidden',background:'#101619'}}><img src={preview.src} alt={preview.alt} loading="lazy" decoding="async" width={1354} height={930} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top',display:'block'}}/></div>;
}
