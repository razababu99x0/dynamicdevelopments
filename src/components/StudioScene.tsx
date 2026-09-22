import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import { TextureLoader, SRGBColorSpace, type Group } from 'three';

function Fallback() {
 return <div className="scene-fallback" role="img" aria-label="Desktop computer displaying the Dynamic Developments logo"><svg viewBox="0 0 440 360" width="90%" height="90%" aria-hidden="true"><rect x="50" y="45" width="340" height="220" rx="16" fill="#222b35" stroke="#899aa7" strokeWidth="5"/><rect x="64" y="60" width="312" height="180" rx="7" fill="#0a131b"/><image href="/favicon.svg" x="161" y="77" width="118" height="118"/><text x="220" y="222" textAnchor="middle" fill="#edf5ff" fontFamily="Arial, sans-serif" fontSize="14" letterSpacing="1.5">DYNAMIC DEVELOPMENTS</text><path d="M198 266v35h-48v10h140v-10h-48v-35" fill="#899aa7"/><rect x="110" y="329" width="220" height="14" rx="6" fill="#647585"/></svg></div>;
}
class Boundary extends Component<{children:ReactNode},{failed:boolean}> {
 state={failed:false}; static getDerivedStateFromError(){return {failed:true}}
 render(){return this.state.failed?<Fallback/>:this.props.children}
}
function Box({position,size,color,metal=false}:{position:[number,number,number];size:[number,number,number];color:string;metal?:boolean}){
 return <RoundedBox position={position} args={size} radius={Math.min(.055,...size.map(x=>x/3))} smoothness={3}>{metal?<meshStandardMaterial color={color} metalness={.75} roughness={.28}/>:<meshBasicMaterial color={color}/>}</RoundedBox>;
}
function ScreenLogo(){
 const texture=useLoader(TextureLoader,'/favicon.svg');
 texture.colorSpace=SRGBColorSpace;
 return <mesh position={[0,.43,.17]}><planeGeometry args={[1.28,1.28]}/><meshBasicMaterial map={texture} transparent toneMapped={false}/></mesh>;
}
function Computer({color,moving}:{color:string;moving:boolean}) {
 const group=useRef<Group>(null),time=useRef(0);
 useFrame((_,dt)=>{if(moving&&group.current){time.current+=dt;group.current.position.y=Math.sin(time.current*.8)*.09;group.current.rotation.y=-.25+Math.sin(time.current*.4)*.2}});
 return <group ref={group} rotation={[.08,-.25,0]}>
  <Box position={[0,.4,0]} size={[3.45,2.2,.19]} color="#8997a7" metal/>
  <Box position={[0,.43,.108]} size={[3.29,2.02,.045]} color="#121924"/>
  <Box position={[0,.46,.137]} size={[3.12,1.8,.015]} color="#09131d"/>
  <Box position={[0,1.23,.153]} size={[3.05,.18,.012]} color="#202e3c"/>
  {['#ff847c','#f5c66a',color].map((c,i)=><mesh key={c+i} position={[-1.4+i*.12,1.23,.17]}><circleGeometry args={[.028,12]}/><meshBasicMaterial color={c}/></mesh>)}
  <ScreenLogo/>
  <Box position={[0,-.52,.167]} size={[.24,.022,.012]} color={color}/>
  <Box position={[0,-1.02,-.04]} size={[.32,.68,.23]} color="#8b9cac" metal/>
  <Box position={[0,-1.35,.05]} size={[1.28,.10,.75]} color="#8293a4" metal/>
  <group position={[-.18,-1.48,1.02]} rotation={[.12,0,0]}>
   <Box position={[0,0,0]} size={[2.5,.11,.78]} color="#778797" metal/>
   {[0,1,2,3].map(row=>Array.from({length:12},(_,col)=><Box key={`${row}-${col}`} position={[-1.1+col*.2,.07,-.27+row*.17]} size={[.15,.025,.12]} color={row===0? '#3d5365':'#172534'}/>))}
  </group>
  <Box position={[1.49,-1.42,1.04]} size={[.35,.16,.59]} color="#b2bdc7" metal/>
  <Box position={[1.49,-1.325,1]} size={[.022,.009,.17]} color={color}/>
 </group>;
}
export default function StudioScene({color,moving}:{color:string;moving:boolean}){
 const wrap=useRef<HTMLDivElement>(null),[visible,setVisible]=useState(true);
 const [supported]=useState(()=>{try{const canvas=document.createElement('canvas');const gl=canvas.getContext('webgl2');if(!gl)return false;gl.getExtension('WEBGL_lose_context')?.loseContext();return true}catch{return false}});
 useEffect(()=>{const el=wrap.current;if(!el)return;let intersecting=true;const update=()=>setVisible(intersecting&&!document.hidden);const io=new IntersectionObserver(([e])=>{intersecting=e.isIntersecting;update()});io.observe(el);document.addEventListener('visibilitychange',update);return()=>{io.disconnect();document.removeEventListener('visibilitychange',update)}},[]);
 if(!supported)return <Fallback/>;
 return <div ref={wrap} className="scene-canvas" role="img" aria-label="Floating 3D desktop computer displaying the Dynamic Developments logo, with metal stand, keyboard and mouse. Drag to explore. Color and motion controls are below."><Boundary><Canvas camera={{position:[0,1.1,7.8],fov:42}} dpr={[1,1.5]} frameloop={visible&&moving?'always':'demand'} gl={{alpha:true,antialias:true}} fallback={<Fallback/>}><ambientLight intensity={1.5}/><directionalLight position={[3,4,5]} intensity={4} color="#ebfaff"/><pointLight position={[-3,1,2]} intensity={25} color={color}/><pointLight position={[3,-2,1]} intensity={20} color="#638bff"/><Computer color={color} moving={visible&&moving}/><OrbitControls enableZoom={false} enablePan={false} enableDamping minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/1.8}/></Canvas></Boundary></div>;
}
