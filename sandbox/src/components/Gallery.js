import React from 'react';
import GalleryBox from './GalleryBox';

let DEFAULTS = {
	bkgSize: 'contain',
	containerHeight: 350,
	containerWidth: '100%',
	fullSize: false,
	injectJewelB: false,
	injectionIdentifier: null,
	mirror: true,
	main: {
		overlay: false,
		hlColor: '#ff8c00',
		hlSize: 16,
		size: 40,
		spacing: 8,
		orientation: 'vertical',
		posX: 'left',
		posY: 'top'
	},
	secondary: {
		overlay: false,
		hlColor: '#ff8c00',
		hlSize: 16,
		size: 40,
		spacing: 8,
		orientation: 'horizontal',
		posX: 'left',
		posY: 'bot'
	}
};

const Gallery = React.createClass({
	getInitialState() {
		return {main: 0, secondary: 0};
	},
	handleEnter(i, place) {
		let spot = place === 'secondary' ? 'secondary' : 'main';
		let {...newState} = this.state;
		newState[spot] = i;
		this.setState(newState);
	},
	changesecondary(i) {
		this.setState({secondary: i});
	},
	getGalleryType() {
		let {images} = this.props;
		let galleryType;
		if (Array.isArray(images)) {
			if (images.every(i => Array.isArray(i))) {
				galleryType = 2;
			} else if (images.every(i => typeof i === 'string')) {
				galleryType = 1;
			} else {
				galleryType = 0;
			}
		} else {
			galleryType = 3;
		}
		return galleryType;
	},
	getConfig(place, params) {
		if (params === null || !params) return false;
		let {config} = this.props;
		let setConfig = {};
		let configPlace = place ? config[place] ? config[place] : DEFAULTS[place] : DEFAULTS;
		// Check datatype of params passed, collect config based on type
		if (Array.isArray(params)) {
			if (configPlace) {
				params.map(function(param) {
					if (configPlace[param]) {
						setConfig[param] = configPlace[param];
					} else {
						setConfig[param] = DEFAULTS[param];
					}
					return
				});
			} else {
				params.map(function(param) {
					setConfig[param] = DEFAULTS[param];
					return
				});
			}
		} else if (typeof params === 'string') {
			if (configPlace[params]) {
				setConfig = configPlace[params];
			} else {
				setConfig = DEFAULTS[params];
			}
		} else if (typeof params === 'object') {
			if (config) {
				Object.keys(params).map(function(param) {
					if (configPlace[param]) {
						setConfig[param] = configPlace[param];
					} else {
						setConfig[param] = DEFAULTS[param];
					}
					return
				});
			} else {
				Object.keys(params).map(function(param) {
					setConfig[param] = DEFAULTS[param];
					return
				});
			}
		} else {
			return false;
		}

		return setConfig;
	},
	getConfigObject(obj) {
		if (!DEFAULTS[obj]) return false;
		let {config} = this.props;

		let configObj = {};
		Object.keys(DEFAULTS[obj]).map(function(key) {
			configObj[key] = config[obj][key] !== undefined ? config[obj][key] : DEFAULTS[obj][key];
		});
		return configObj;
	},
	buildJewelStyle(place) {
		if (!place) return DEFAULTS.main;

		let configObj = this.getConfigObject(place);
		let style = {
			container: {
				float: configObj.orientation === 'horizontal' ? 'left' : '',
				zIndex: 900
			},
			jewel: {
				size: configObj.size,
				hlSize: configObj.hlSize,
				hlColor: configObj.hlColor,
				spacing: configObj.spacing
			}
		};
		return style;
	},
	buildJewelContainerStyle(kind) {

		let configObj = this.getConfigObject(kind);

		let verticalStyle = configObj.posY === 'top' ?
			{ top: 0 } : { bottom: 0 };

		let horizontalStyle = configObj.posX === 'left' ?
			{ left: 0 } : { right: 0 };

		let style = {
			position: 'absolute',
			...verticalStyle,
			...horizontalStyle
		};
		return style;
	},
	buildPaddingStyle(padding, config, paddingSize) {
		if (!config.overlay) {
			if (config.orientation === 'horizontal') {
				// Orientation for These Jewels is Horizontal, so we care about posY (Top And Bottom)
				if (config.posY === 'top') {
					padding.top +=  paddingSize;
				} else {
					padding.bottom +=  paddingSize;
				}
			} else if ( config.orientation === 'vertical' ) {
				// Orientation for These Jewels is Vertical, so we care about posX (Left And Right)
				if (config.posX === 'left') {
					padding.left += paddingSize;
				} else {
					padding.right += paddingSize;
				}
			}
		}
		return padding;
	},
	buildContainerStyle(kind) {

		let mainConfig = this.getConfigObject('main');
		let secondaryConfig = this.getConfigObject('secondary');

		let mainPaddingSize = parseInt(mainConfig.size) + parseInt(mainConfig.spacing) + 4;
		let secondaryPaddingSize = parseInt(secondaryConfig.size) + parseInt(secondaryConfig.spacing) + 4;

		let padding = {
			left: 0,
			right: 0,
			bottom: 0,
			top: 0
		};

		let gallType = this.getGalleryType();
		switch(gallType) {
			case 2:
				padding = this.buildPaddingStyle(padding, mainConfig, mainPaddingSize);
				padding = this.buildPaddingStyle(padding, secondaryConfig, secondaryPaddingSize);
				break;
			case 1:
			default:
				padding = this.buildPaddingStyle(padding, mainConfig, mainPaddingSize);
		};

		let containerStyle = {};

		let derPadding = padding.top+'px '+padding.right+'px '+padding.bottom+'px '+padding.left+'px';

		containerStyle = {
			padding: derPadding
		};

		return containerStyle;
	},

	buildJewels() {
		let jewelContainers = {};
		let gallType = this.getGalleryType();
		if (Array.isArray(this.props.images)) {
			switch(gallType) {
				case 2:
					jewelContainers = this.buildDualArray(this.props.images);
					break;
				case 1:
				default:
					jewelContainers = [this.buildSingleArray(this.props.images, 'main'), null];
			}
		}
		return jewelContainers;
	},
	buildDualArray(images) {
		let mainArray, secondaryArray;
		let {main, secondary} = this.state;
		secondaryArray = images.map(function(imgArray, i) {
			if (i == secondary) {
				mainArray = this.buildSingleArray(imgArray, 'main');
			}
			return this.buildJewel(imgArray[0], i, 'secondary');
		}.bind(this));
		return [mainArray, secondaryArray]
	},
	buildSingleArray(images, place) {
		let imageJewels = images.length > 0 ? images.map(function(img, i) {
			let imgLocation = images[i];
			return this.buildJewel(img, i, place);
		}.bind(this)) : null;
		return imageJewels;
	},
	buildJewel(img, i, place) {
		let jewelStyle = this.buildJewelStyle(place);
			return <div style={jewelStyle.container} onMouseEnter={this.handleEnter.bind(null, i, place)} key={place+''+i}>
						<GalleryBox config={jewelStyle.jewel} orientation={this.getConfig(place, 'orientation')} index={this.state[place]} spot={i} place={place} img={img} />
					</div>
	},
	injectArray() {

	},
	getGalleryImage() {
		let {main, secondary} = this.state;
		let {images} = this.props;
		let kind = this.getGalleryType();
		switch(kind) {
			case 2:
				return images[secondary][main];
				break;
			case 1:
			default:
				return images[main];
		};
	},
	render() {
		if (!Array.isArray(this.props.images)) return <div style={{width: '100%',height: '100%', display: 'flex'}}><div style={{margin: 'auto'}}>No Images</div></div>;
		
		let {style, jewelContainerStyle, jewelSecondaryContainerStyle, galleryStyle, images, jewelSize} = this.props;

		let imageLoc = this.getGalleryImage();
		let galleryMain = {
			height: this.getConfig(null, 'height'),
			width: this.getConfig(null, 'width'),
			backgroundImage: "url('"+imageLoc+"')",
			backgroundSize: this.getConfig(null, 'bkgSize') || 'contain',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
		};
		let jewelMainContainer = this.buildJewelContainerStyle('main');
		let jewelSecondaryContainer = this.buildJewelContainerStyle('secondary');
		let jewels = this.buildJewels();
		let jewelSet = Array.isArray(jewels[0]) ? jewels[0] : jewels;
		let jewelSecondarySet = Array.isArray(jewels[1]) ? <div style={{...jewelSecondaryContainer, ...jewelSecondaryContainerStyle}}>{jewels[1]}</div> : null;

		let containerStyle = this.buildContainerStyle();
		return (
			<div style={{position: 'relative', height: '100%', width: '100%', ...style}}>
				<div style={{...containerStyle, position: 'relative', width: '100%', height: '100%'}}>
					<div style={{...galleryMain, ...galleryStyle}} ref="section" />
				</div>
				<div style={{...jewelMainContainer, ...jewelContainerStyle}}>
					{jewelSet}
				</div>
				{jewelSecondarySet}
			</div>
		);
	}
});

export default Gallery;