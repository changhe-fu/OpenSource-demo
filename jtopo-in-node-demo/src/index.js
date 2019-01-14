import test from "npm-demo"

import Jtopo from "jtopo-in-node"

test.sayHi()
console.log("Jtopo",Jtopo)


function newLink(nodeA, nodeZ, text){
  var link = new JTopo.Link(nodeA, nodeZ, text);
  link.lineWidth = 3; // 线宽
  link.bundleOffset = 80; // 折线拐角处的长度
  link.bundleGap = 40; // 线条之间的间隔
  link.textOffsetY = 3; // 文本偏移量（向下3个像素）
  link.strokeColor = '0,200,255';
  link.arrowsRadius = 10;
  link.fontColor ="0,0,0";
  this.add(link);
}
var jtopoComponent = () => {
  
  var canvas = document.getElementById('canvas');
  var stage = new JTopo.Stage(canvas);
  var scene = new JTopo.Scene(stage);
  scene.backgroundColor="255,240,202";
  scene.alpha=1;

  var node = new JTopo.Node("asd");
  node.fontColor ="0,0,0";
  node.setImage('http://img.cdn.aliyun.dcloud.net.cn/ask/img/%E5%B9%BF%E5%91%8A%E4%BD%8D%E6%8B%9B%E7%A7%9F.jpg');
  node.setSize(40,40);
  scene.add(node);


  
//   // 自动布局
//   var keyArray=["a","b","c","d","e","f","g","h","i","j","k"];
// 		for(var i=0;i<keyArray.length;i++){
// 			var key = keyArray[i];
// 			var node = new JTopo.Node(key);
// 			node.id = key;
// 			node.fontColor ="0,0,0"
// 			node.setImage('house.png');
// 			node.setSize(40,40);
// 			scene.add(node);
// 		}
// 		var nodeA = scene.findElements(function(e){ return e.id == "a"; })[0];
// 		var nodeB = scene.findElements(function(e){ return e.id == "b"; })[0];
// 		var nodeC = scene.findElements(function(e){ return e.id == "c"; })[0];
// 		var nodeD = scene.findElements(function(e){ return e.id == "d"; })[0];
// 		var nodeE = scene.findElements(function(e){ return e.id == "e"; })[0];
// 		var nodeF = scene.findElements(function(e){ return e.id == "f"; })[0];
// 		var nodeG = scene.findElements(function(e){ return e.id == "g"; })[0];
// 		var nodeH = scene.findElements(function(e){ return e.id == "h"; })[0];
// 		var nodeI = scene.findElements(function(e){ return e.id == "i"; })[0];
// 		var nodeJ = scene.findElements(function(e){ return e.id == "j"; })[0];
// 		var nodeK = scene.findElements(function(e){ return e.id == "k"; })[0];
// 		newLink.call(scene,nodeA,nodeB);
// 		newLink.call(scene,nodeA,nodeC);
// 		newLink.call(scene,nodeA,nodeD);
// 		newLink.call(scene,nodeA,nodeE);
// 		newLink.call(scene,nodeA,nodeF);
// 		newLink.call(scene,nodeB,nodeG);
// 		newLink.call(scene,nodeB,nodeI);
// 		newLink.call(scene,nodeC,nodeG);
// 		newLink.call(scene,nodeC,nodeH);
// 		newLink.call(scene,nodeE,nodeF);
// 		newLink.call(scene,nodeF,nodeK);
// 		newLink.call(scene,nodeI,nodeJ);
// 		newLink.call(scene,nodeI,nodeK);
// 		newLink.call(scene,nodeJ,nodeG);
		
// 		//自动布局
// 		JTopo.Layout.layoutGraph(scene, nodeA, -1,null,function(){
//       document.querySelector("#layoutStatus").innerText = "开始布局！";
// 		},function(){
//       document.querySelector("#layoutStatus").innerText = "结束布局！";
// 			//序列化
//       // var data = JTopo.seriailzeToJSON(stage);
      
// 			//反序列化
// 			// JTopo.deSeriailzeByJSON(data,canvas);
// 		});
}

var myComponent = () => {
    let item = document.createElement("div");
    item.innerHTML = `<p>hello，二狗子！</p>
                      <p id="layoutStatus">自动布局情况</p>
                      <canvas id="canvas"  width="800" height="600"></canvas>`
  return item;
};

document.body.appendChild(myComponent());
jtopoComponent()