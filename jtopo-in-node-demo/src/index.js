import test from "npm-demo";

import Jtopo from "jtopo-in-node";

test.sayHi();
console.log("Jtopo", Jtopo);

var initTopo = function() {
  var canvas = document.getElementById("canvas");
  var stage = new JTopo.Stage(canvas);
  var scene = new JTopo.Scene(stage);
  scene.backgroundColor = "255,240,202";
  scene.alpha = 1;

  function node(x, y, img, name) {
    var node = new JTopo.Node(name);
    node.fontColor = "0,0,0";
    node.setImage(img, true);
	node.setLocation(x, y);
	node.mousedown(function(event){
		if(event.button == 2){
			node.text = '按下右键';                    
		}else if(event.button == 1){
			node.text = '按下中键';                    
		}else if(event.button == 0){
			node.text = '按下左键';    
		}                
	});
	
	node.mouseup(function(event){                
		if(event.button == 2){
			node.text = '松开右键';                    
		}else if(event.button == 1){
			node.text = '松开中键';                    
		}else if(event.button == 0){
			node.text = '松开左键';    
		}
	});    
	node.click(function(event){                    
		console.log("单击");                
	});    
	node.dbclick(function(event){                
		console.log("双击");                
	});
	node.mousedrag(function(event){                
		console.log("拖拽");
	});    
	node.mouseover(function(event){                
		console.log("mouseover");                
	});
	node.mousemove(function(event){                
		console.log("mousemove");                
	});    
	node.mouseout(function(event){                
		console.log("mouseout");                
	});    
    scene.add(node);
    return node;
  }
  function linkNode(nodeA, nodeZ) {
    var link = new JTopo.FoldLink(nodeA, nodeZ);
    link.lineWidth = 3;
    link.strokeColor = "255,255,0";
    scene.add(link);
    return link;
  }

  var n1 = node(49, 41, "http://img.cdn.aliyun.dcloud.net.cn/ask/img/%E5%B9%BF%E5%91%8A%E4%BD%8D%E6%8B%9B%E7%A7%9F.jpg", "node1");
  var n2 = node(500, 41, "https://avatar.csdn.net/7/5/1/1_qq_39759115.jpg?1547450776", "node 2");
  linkNode(n1, n2);

};

var myComponent = () => {
  let item = document.createElement("div");
  item.innerHTML = `<p>hello，二狗子！</p>
                    <canvas id="canvas"  width="800" height="600"></canvas>`;
  return item;
};

document.body.appendChild(myComponent());
initTopo();
