define("DS/VisuLoaders/XMLV6SmartLoaderPassPlugin",["DS/Visualization/ThreeJS_DS"],function(a){return function(e){this.enabled=false;this.renderTarget=null;var b=e;var d,g,c=new a.Frustum(),f=new a.Matrix4();this.init=function(h){d=h.context;g=h};this.render=function(i,h){if(!this.enabled){return}if(b.isWebWorkerBusy()){return}this.update(i,h)};this.update=function(B,z){var y,r,x,A,v,q,w,u,k,C,l,t,h=null;if(g.autoUpdateScene){B.updateMatrixWorld()}z.matrixWorldInverse.getInverse(z.matrixWorld);f.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse);c.setFromMatrix(f);t=B.getWebGLObjects("main",0);var s=[];for(x=0,A=t.length;x<A;x++){k=t[x];if(k===null){continue}C=k.object;if(!(C instanceof a.Mesh)||!(C.frustumCulled)||c.intersectsObject(C)){if(C.name=="BBox"){var p=-1;if(C.boundingSphere!==null){var o=new a.Vector3();o.copy(C.boundingSphere.center);o.applyMatrix4(C.matrixWorld);var D=new a.Vector3();D.subVectors(o,z.position);var m=D.length();p=C.boundingSphere.radius/m}s.push({name:C._occurrence.parent.node.name,priority:p})}}}s.sort(function(j,i){if(j.priority<i.priority){return 1}if(j.priority>i.priority){return -1}return 0});b.loadGeometryFiles(s)}}});