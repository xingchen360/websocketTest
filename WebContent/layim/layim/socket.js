/**
 * 
 */
$(function(){
	setTimeout(function(){
		$("li[data-id='1']").click();
		$("li[data-id='100001']").click();
		
		
		var Chat = {};
		
		Chat.socket = null;
		
		Chat.connect = (function(host) {
			if ('WebSocket' in window) {
				Chat.socket = new WebSocket(host);
			} else if ('MozWebSocket' in window) {
				Chat.socket = new MozWebSocket(host);
			} else {
				Console.log('Error: WebSocket is not supported by this browser.');
				return;
			}
			Console.log('Error: WebSocket is not supported by this browser.');
			Console.log('Error: WebSocket is not supported by this browser.');
			Console.log('Error: WebSocket is not supported by this browser.');
			Console.log('Error: WebSocket is not supported by this browser.');
			
			Chat.socket.onopen = function () {
				Console.log('Info: WebSocket connection opened.');
				document.getElementById('layim_areaone100001').onkeydown = function(event) {
					if (event.keyCode == 13) {
						Chat.sendMessage();
					}
				};
			};
			
			Chat.socket.onclose = function () {
				document.getElementById('layim_areaone100001').onkeydown = null;
				Console.log('Info: WebSocket closed.');
			};
			
			Chat.socket.onmessage = function (message) {
				Console.log(message.data);
			};
		});
		
		Chat.initialize = function() {
			if (window.location.protocol == 'http:') {
				Chat.connect('ws://' + window.location.host + '/examples/websocket/chat');
			} else {
				Chat.connect('wss://' + window.location.host + '/examples/websocket/chat');
			}
		};
		
		Chat.sendMessage = (function() {
			var message = document.getElementById('layim_areaone100001').value;
			if (message != '') {
				Chat.socket.send(message);
				document.getElementById('layim_areaone100001').value = '';
			}
		});
		
		var Console = {};
		
		Console.log = (function(message) {
			var consolediv = document.getElementById('layim_chatarea');
			console.info(consolediv);
			var p = document.createElement('p');
			p.style.wordWrap = 'break-word';
			p.innerHTML = message;
			consolediv.appendChild(p);
			while (consolediv.childNodes.length > 25) {
				consolediv.removeChild(consolediv.firstChild);
			}
			consolediv.scrollTop = consolediv.scrollHeight;
		});
		
		Chat.initialize();
		
		
		document.addEventListener("DOMContentLoaded", function() {
			// Remove elements with "noscript" class - <noscript> is not allowed in XHTML
			var noscripts = document.getElementsByClassName("noscript");
			for (var i = 0; i < noscripts.length; i++) {
				noscripts[i].parentNode.removeChild(noscripts[i]);
			}
		}, false);
	}, 1000);
});
