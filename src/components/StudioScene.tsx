import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { Group } from 'three';
function Fallback(){return <div className="scene-fallback fallback-3d" aria-label="Animated orbital sculpture"><div className="fallback-sculpture">{Array.from({length:9},(_,i)=><i key={i} style={{transform:`rotateY(${i*20}deg) rotateX(35deg)`}}/>)}<span/></div></div>}
class Boundary extends Component<{children:ReactNode},{failed:boolean}> {
 state={failed:false}; static getDerivedStateFromError(){return {failed:true}}
 render(){return this.state.failed?<Fallback/>:this.props.children}
}
function Sculpture({color,moving}:{color:string;moving:boolean}){
 const ref=useRef<Group>(null);
 useFrame((_,dt)=>{if(moving&&ref.current){ref.current.rotation.y+=dt*.18;ref.current.rotation.z+=dt*.045}});
 return <group ref={ref} rotation={[.25,0,-.35]}><mesh><torusKnotGeometry args={[1.18,.34,160,24,2,3]}/><meshStandardMaterial color="#c9d6db" metalness={.78} roughness={.22}/></mesh><mesh rotation={[Math.PI/2.2,.4,0]}><torusGeometry args={[2.02,.019,10,120]}/><meshBasicMaterial color={color}/></mesh><mesh rotation={[.4,Math.PI/2.4,.4]}><torusGeometry args={[2.26,.012,8,120]}/><meshBasicMaterial color="#79c9ef" transparent opacity={.65}/></mesh>{[0,1,2,3,4,5].map(i=><mesh key={i} position={[Math.cos(i*Math.PI/3)*2.02,Math.sin(i*Math.PI/3)*2.02,0]}><sphereGeometry args={[.045,12,12]}/><meshBasicMaterial color={color}/></mesh>)}</group>
}
export default function StudioScene({color,moving}:{color:string;moving:boolean}){
 const wrap=useRef<HTMLDivElement>(null),[visible,setVisible]=useState(true);
 const [supported]=useState(()=>{try{const canvas=document.createElement('canvas');const gl=canvas.getContext('webgl2');if(!gl)return false;gl.getExtension('WEBGL_lose_context')?.loseContext();return true}catch{return false}});
 useEffect(()=>{const el=wrap.current;if(!el)return;const io=new IntersectionObserver(([e])=>setVisible(e.isIntersecting));io.observe(el);const fn=()=>setVisible(!document.hidden&&el.getBoundingClientRect().bottom>0);document.addEventListener('visibilitychange',fn);return()=>{io.disconnect();document.removeEventListener('visibilitychange',fn)}},[]);
 if(!supported)return <Fallback/>;
 return <div ref={wrap} className="scene-canvas" role="img" aria-label="A rotating chrome knot with luminous orbital rings. Drag to rotate. Color and motion controls are below."><Boundary><Canvas camera={{position:[0,0,6.4],fov:46}} dpr={[1,1.5]} frameloop={visible&&moving?'always':'demand'} gl={{alpha:true,antialias:true}} fallback={<Fallback/>}><ambientLight intensity={1.5}/><directionalLight position={[3,4,5]} intensity={5} color="#ebfaff"/><pointLight position={[-3,1,2]} intensity={35} color={color}/><pointLight position={[3,-2,1]} intensity={30} color="#638bff"/><Sculpture color={color} moving={visible&&moving}/><OrbitControls enableZoom={false} enablePan={false} enableDamping/></Canvas></Boundary></div>
}
