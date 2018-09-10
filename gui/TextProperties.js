const TextProperties = {
	label : function(textColor, backgroundColor, font){
		if(textColor === undefined) textColor = 'rgb(0,0,0)';
		if(backgroundColor === undefined) backgroundColor = 'rgba(0,0,0,0)';
		if(font === undefined) font = '10px sans-serif';
		return {
			textColor : textColor,
			backgroundColor : backgroundColor,
			borderX : 0,
			borderY : 0,
			marginX : 0,
			marginY : 0,
			horAlignment : 'left',
			verAlignment: 'down',
			font : font
		};
	},
	button : function(backgroundColor, borderColor, textColor, font){
		if(backgroundColor === undefined) backgroundColor = 'rgb(0,150,150)';
		if(borderColor === undefined) borderColor = 'rgb(0,60,0)';
		if(textColor === undefined) textColor = '#000000';
		if(font === undefined) font = '10px sans-serif';
		return {
			textColor : textColor,
			backgroundColor : backgroundColor,
			borderColor : borderColor,
			borderX : 0.05,
			borderY : 0.1,
			marginX : 0.05,
			marginY : 0.1,
			horAlignment : 'middle',
			font : font
		};
	},
	hoverButton : function(backgroundColor, borderColor, textColor, font){
		if(backgroundColor === undefined) backgroundColor = 'rgb(0,180,180)';
		if(borderColor === undefined) borderColor = 'rgb(0,120,0)';
		if(textColor === undefined) textColor = 'rgb(0,0,0)';
		if(font === undefined) font = '10px sans-serif';
		return {
			textColor : textColor,
			backgroundColor : backgroundColor,
			borderColor : borderColor,
			borderX : 0.05,
			borderY : 0.1,
			marginX : 0.05,
			marginY : 0.1,
			horAlignment : 'middle',
			font : font
		};
	},
	tab : function(backgroundColor, borderColor, textColor, font){
		if(backgroundColor === undefined) backgroundColor = 'rgb(0,180,180)';
		if(borderColor === undefined) borderColor = 'rgb(0,120,0)';
		if(textColor === undefined) textColor = 'rgb(0,0,0)';
		if(font === undefined) font = '10px sans-serif';
		return {
			textColor : textColor,
			backgroundColor : backgroundColor,
			borderColor : borderColor,
			borderX : 0.025,
			borderY : 0.05,
			marginX : 0.05,
			marginY : 0.1,
			horAlignment : 'middle',
			font : font
		};
	},
	hoverTab : function(backgroundColor, borderColor, textColor, font){
		if(backgroundColor === undefined) backgroundColor = 'rgb(0,180,180)';
		if(borderColor === undefined) borderColor = 'rgb(0,120,0)';
		if(textColor === undefined) textColor = 'rgb(0,0,0)';
		if(font === undefined) font = '10px sans-serif';
		return {
			textColor : textColor,
			backgroundColor : backgroundColor,
			borderColor : borderColor,
			borderX : 0.025,
			borderY : 0.05,
			marginX : 0.05,
			marginY : 0.1,
			horAlignment : 'middle',
			font : font
		};
	},
	edit : function(textColor, backgroundColor, borderColor, font){
		if(textColor === undefined) textColor = 'rgb(0,0,0)';
		if(backgroundColor === undefined) backgroundColor = 'rgb(130,130,130)';
		if(borderColor === undefined) borderColor = 'rgb(30,30,30)';
		if(font === undefined) font = '10px verdana';
		return {
			textColor : textColor,
			backgroundColor : backgroundColor,
			borderColor : borderColor,
			borderX : 0.03,
			borderY : 0.06,
			marginX : 0.1,
			marginY : 0.1,
			horAlignment : 'left',
			font : font,
			resize: false
		};
	},
	focusEdit : function(textColor, backgroundColor, borderColor, font){
		if(textColor === undefined) textColor = 'rgb(0,0,0)';
		if(backgroundColor === undefined) backgroundColor = 'rgb(255,255,255)';
		if(borderColor === undefined) borderColor = 'rgb(90,90,90)';
		if(font === undefined) font = '10px verdana';
		return {
			textColor : textColor,
			backgroundColor : backgroundColor,
			borderColor : borderColor,
			borderX : 0.03,
			borderY : 0.06,
			marginX : 0.1,
			marginY : 0.1,
			horAlignment : 'left',
			font : font,
			resize: false
		};
	},
	listElement : function(backgroundColor, borderColor, textColor, font){
		if(textColor === undefined) textColor = 'rgb(0,0,0)';
		if(font === undefined) font = '10px sans-serif';
		return {
			backgroundColor : backgroundColor,
			borderColor : borderColor,
			textColor : textColor,
			font : font,
			borderX : 0.03,
			borderY : 0.02,
			marginX : 0.05,
			marginY : 0.1,
			horAlignment : 'left'
		};
	}
}