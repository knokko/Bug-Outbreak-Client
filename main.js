const Game = {
	menus : {
		main : {

		},
		info : {

		},
		account : {

		},
		profile : {
			models : {
				local: {

				},
				server: {
					
				}
			}
		},
		realm : {
			select : {
				
			}
		},
		dev : {
			
		}
	},
	menuComponents : {
		profile : {
			models : {
				
			}
		}
	},
	profile: {
		models : {}
	}
};

function main(){
	Game.guiManager = new Gui.Manager();
	Game.guiManager.setMainComponent(Game.menus.main.login);
	Game.guiManager.start();
	//TODO https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
}