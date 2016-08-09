import React from 'react';
import PubGallery from 'react-amazon-gallery';
import WorkingGallery from './Gallery';
import Extendo from './ExtendoBox';
const configTableDescription = {
	bkgSize: 'Background Size',
	cHeight: 'Container Height',
	orientation: 'Orientation',
	overlay: 'Overlay', 
	posY: 'Position Y-Axis',
	posX: 'Position X-Axis',
	jewelSpacing: 'Jewel Spacing',
	jewelSize: 'Jewel Size',
	hlColor: 'Hightlight Color',
	hlSize: 'Hightlight Size'
};
const DEFAULT_CONFIG = {
	bkgSize: 'cover',
	containerHeight: '300',
	containerWidth: '100%',
	fullSize: false,
	injectJewelB: false,
	injectionIdentifier: null,
	mirror: true,
	main: {
		posY: 'top',
		posX: 'left',
		orientation: 'vertical',
		spacing: 8,
		size: 42,
		hlColor: '#ff8c00',
		hlSize: 16,
	},
	secondary: {
		posY: 'bot',
		posX: 'left',
		orientation: 'horizontal',
		spacing: 8,
		size: 42,
		hlSize: 16,
	}
};
const configHide = [
	'imageSource'
];
let imageArray = [
	'/img/sample_array/land0.jpg',
	'/img/sample_array/land1.jpg',
	'/img/sample_array/land2.jpg',
	'/img/sample_array/land3.jpg',
	'/img/sample_array/land4.jpg',
];
let imageMDArray = [
	[
	'/img/sample_map/blck_0.jpg',
	'/img/sample_map/blck_1.jpg',
	'/img/sample_map/blck_2.jpg',
	'/img/sample_map/blck_3.jpg',
	'/img/sample_map/blck_4.jpg',
	'/img/sample_map/blck_5.jpg',
	],
	[
	'/img/sample_map/blue_0.jpg',
	'/img/sample_map/blue_1.jpg',
	'/img/sample_map/blue_2.jpg',
	'/img/sample_map/blue_3.jpg',
	'/img/sample_map/blue_4.jpg',
	'/img/sample_map/blue_5.jpg',
	],
	[
	'/img/sample_map/red_0.jpg',
	'/img/sample_map/red_1.jpg',
	'/img/sample_map/red_2.jpg',
	'/img/sample_map/red_3.jpg',
	'/img/sample_map/red_4.jpg',
	'/img/sample_map/red_5.jpg',
	]
];
if (!library)
	 var library = {};

library.json = {
	 replacer: function(match, pIndent, pKey, pVal, pEnd) {
			var key = '<span class="json-key">';
			var val = '<span class="json-value">';
			var str = '<span class="json-string">';
			var r = pIndent || '';
			if (pKey)
				 r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
			if (pVal)
				 r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
			return r + (pEnd || '');
			},
	 prettyPrint: function(obj) {
			if (!obj) return '{}';
			var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
			return JSON.stringify(obj, null, 3)
				 .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
				 .replace(/</g, '&lt;').replace(/>/g, '&gt;')
				 .replace(jsonLine, library.json.replacer);
			}
	 };
function createMarkup(markup) { return {__html: markup}; };

let localStyles = {
	input: {
		button: {
			main: {
				border: 'none',
				padding: '8px 16px'
			},
			on: {
				background: '#4CAF50',
				color: 'white',
			},
			off: {
				background: '#bbb'
			}
		},
		slider: {
			wrap: {

			}
		},
		text: {
				border: 'none',
				background: 'none',
				textAlign: 'center',
				fontSize: '1.2em',
				padding: '4px',
				maxWidth: '150px'
		},
		bool: {
			main: {
				width: '24px',
				height: '24px',
				margin: '4px auto',
				cursor: 'pointer',
				borderRadius: '6px',
				boxShadow: '0px 0px 1px 1px rgba(0,0,0,1)'
			},
			on: {
				background: '#4CAF50'
			},
			off: {
				background: 'grey'
			}			
		},
		color: {
			width: '100%',
			border: 'none'
		}
	},
	section: {
		wrap: {

		},
		title: {
			width: '100%',
			fontSize: '2em',
		}
	},
	config: {
		table: {
			wrap: {
				width: '100%',
				padding: '8px'
			},
			row: {
				float: 'left',
				margin: '8px 0',
				width: '100%',
				justifyContent: 'space-around'
			}
		},
		setting: {
			wrap: {
				textAlign: 'center',
				width: '300px'
			},
			string: {
				border: 'none',
				background: 'none',
				textAlign: 'center',
				fontSize: '1.2em',
				padding: '4px'
			},
			title: {
				padding: '4px'
			},
			slider: {
				wrap: {
					width: '100%'
				}
			},
			bool: {

			},
			color: {
				width: '100%',
				border: 'none'
			}
		},
	}
};

const App = React.createClass({
	getInitialState() {
		return {
			config: DEFAULT_CONFIG,
			imageSource: 2,
		}
	},
	changeImageSource(i) {
		this.setState({imageSource: i});
	},
	resetDefault() {
		this.setState({config: DEFAULT_CONFIG});
	},
	changeConfig(source, config, val, e) {
		e.preventDefault();
		let {...newConfig} = this.state.config;
		if (source) {
			newConfig[source][config] = val;
		} else {
			newConfig[config] = val;
		}
		this.setState({config: newConfig});
	},
	handleTextChange(slider, value, e) {
		console.log(e.target.value);
		console.log(slider);
		console.log(value);
		let {...newConfig} = this.state.config;
		newConfig[slider][value] = e.target.value;
		this.setState({config: newConfig});
	},
	handleSlider(slider, value, e) {
		console.log(e.target.value);
		console.log(slider);
		console.log(value);
		let {...newConfig} = this.state.config;
		newConfig[slider][value] = parseInt(e.target.value);
		this.setState({config: newConfig});
	},
	changeColor(color) {
		let {...newConfig} = this.state.config;
		newConfig['hlColor'] = color;
		this.setState({config: newConfig});
	},
	isConfigSet(source, setting, value) {
		let {config} = this.state;
		if (config[source]) {
			return config[source][setting] === value;
		}
	},
	filter(state) {

		if (Object(state)) {
			let filteredState = {};
			Object.keys(state).map(function(key) {
				if (state[key] !== DEFAULT_CONFIG[key] && !configHide.includes(key)) {
					filteredState[key] = state[key];
				}
			});
			return filteredState;
		};
		return false;
	},
	getImageSource() {
		let type = this.state.imageSource;
		switch(type) {
			case 2:
				return imageMDArray;
				break;
			case 1:
			default:
				return imageArray;
		}
	},
	render() {
		let {config} = this.state;
		let {orientation, posY} = config;

		let codeSectionHeader = {
			padding: '0 1em',
			textAlign: 'center'
		};
		let filteredState = this.filter(config);
		let imageSource = this.getImageSource();
		let secondaryConfig = this.state.imageSource == 2 ?
					<div style={localStyles.config.table.row} className='flxbx flxwp'>
							<div style={{width: '100%'}}>Secondary Jewels</div>
							<div style={{}}>
								<div>Overlay</div>
								<div onClick={this.changeConfig.bind(null, 'secondary', 'overlay', !config['secondary'].overlay)} style={Object.assign({}, localStyles.input.bool.main, config['secondary'].overlay ? localStyles.input.bool.on : localStyles.input.bool.off)} />
							</div>
							<div>
								<div style={localStyles.config.setting.title}>Layout</div>
								<button style={Object.assign({}, localStyles.input.button.main, (this.isConfigSet('secondary', 'orientation', 'vertical') ? localStyles.input.button.on : localStyles.input.button.off) )} type="submit" onClick={this.changeConfig.bind(null, 'secondary', 'orientation', 'vertical')}>Vertical</button>
								<button style={Object.assign({}, localStyles.input.button.main, (this.isConfigSet('secondary', 'orientation', 'horizontal') ? localStyles.input.button.on : localStyles.input.button.off) )} type="submit" onClick={this.changeConfig.bind(null,  'secondary', 'orientation', 'horizontal')}>Horizontal</button>
							</div>
							<div>
								<div style={localStyles.config.setting.title}>Y Axis</div>
								<button style={Object.assign({}, localStyles.input.button.main, (this.isConfigSet('secondary', 'posY', 'top') ? localStyles.input.button.on : localStyles.input.button.off) )} type="submit" onClick={this.changeConfig.bind(null, 'secondary', 'posY', 'top')}>Top</button>
								<button style={Object.assign({}, localStyles.input.button.main, (this.isConfigSet('secondary', 'posY', 'bot') ? localStyles.input.button.on : localStyles.input.button.off) )} type="submit" onClick={this.changeConfig.bind(null, 'secondary', 'posY', 'bot')}>Bot</button>
							</div>
							<div>
								<div style={localStyles.config.setting.title}>X Axis</div>
								<button style={Object.assign({}, localStyles.input.button.main, (this.isConfigSet('secondary', 'posX', 'left') ? localStyles.input.button.on : localStyles.input.button.off) )} type="submit" onClick={this.changeConfig.bind(null, 'secondary', 'posX', 'left')}>Left</button>
								<button style={Object.assign({}, localStyles.input.button.main, (this.isConfigSet('secondary', 'posX', 'right') ? localStyles.input.button.on : localStyles.input.button.off) )} type="submit" onClick={this.changeConfig.bind(null, 'secondary', 'posX', 'right')}>Right</button>
							</div>
							<div style={localStyles.config.table.row} className='flxbx flxwp'>
								<div style={localStyles.config.setting.wrap}>
									<div style={localStyles.config.setting.wrap} className='flxbx'>
										<div style={localStyles.config.setting.title}>Spacing</div>
										<input style={localStyles.input.text} onChange={this.handleSlider.bind(null, 'secondary', 'spacing')} type="text" id="weight" min={0} value={config['secondary']['spacing']} max={100} step={1} />
									</div>
									<input onChange={this.handleSlider.bind(null, 'secondary', 'spacing')} style={localStyles.input.slider.wrap} type="range" id="weight" min={0} value={config['secondary']['spacing']} max={100} step={1} />
								</div>
								<div style={localStyles.config.setting.wrap}>
									<div style={localStyles.config.setting.wrap} className='flxbx'>
										<div style={localStyles.config.setting.title}>Size</div>
										<input style={localStyles.input.text} onChange={this.handleSlider.bind(null, 'secondary', 'size')} type="text" id="weight" min={0} value={config['secondary']['size']} max={100} step={1} />
									</div>
									<input onChange={this.handleSlider.bind(null, 'secondary', 'size')} style={localStyles.input.slider.wrap} type="range" id="weight" min={0} value={config['secondary']['size']} max={100} step={1} />
								</div>
							</div>
							<div style={localStyles.config.table.row} className='flxbx flxwp'>
								<div style={localStyles.config.setting.wrap}>
									<div style={localStyles.config.setting.wrap} className='flxbx'>
										<div style={localStyles.config.setting.title}>Highlight Color</div>
										<input style={localStyles.input.text} onChange={this.handleTextChange.bind(null, 'secondary', 'hlColor')} type="text" value={config['secondary']['hlColor']} />
									</div>
									<input style={localStyles.config.setting.color} onChange={this.handleTextChange.bind(null, 'secondary', 'hlColor')} type="color" id="weight" min={0} value={config['secondary']['hlColor']} max={100} step={1} />
								</div>
								<div style={localStyles.config.setting.wrap}>
									<div style={localStyles.config.setting.wrap} className='flxbx'>
										<div style={localStyles.config.setting.title}>Hightlight Size</div>
										<input style={localStyles.input.text} onChange={this.handleSlider.bind(null, 'secondary', 'hlSize')} type="text" id="weight" min={0} value={config['secondary']['hlSize']} max={100} step={1} />
									</div>
									<input onChange={this.handleSlider.bind(null, 'secondary', 'hlSize')} style={localStyles.input.slider.wrap} type="range" id="weight" min={0} value={config['secondary']['hlSize']} max={100} step={1} />
								</div>
							</div>
					</div>
					: null;
		return (
			<div style={{padding: '2em'}} className=''>

			<div style={{width: '100%', textAlign: 'center', fontSize: '2.5em'}}><a href='https://github.com/michaellyons/react-amazon-gallery'>React Amazon Gallery</a></div>
			<div style={{width: '100%', textAlign: 'center', fontSize: '1em'}}>This is a React JS Component inspired by clean gallery design.</div>
				<div style={{width: '40%', textAlign: 'center', margin: '1em auto'}}>
					<div style={codeSectionHeader}><h4>Installation</h4></div>
					<pre><code>{"npm install react-amazon-gallery"}</code></pre>
				</div>
			<div style={{maxWidth: '1200px', margin: '0 auto'}}>
				<div style={{width: '100%', justifyContent: 'center', display: 'flex', padding: '1em'}}>
					<button style={Object.assign({}, localStyles.input.button.main, (this.state.imageSource == 1 ? localStyles.input.button.on : localStyles.input.button.off) )} onClick={this.changeImageSource.bind(null, 1)}>1 Dimension</button>
					<button style={Object.assign({}, localStyles.input.button.main, (this.state.imageSource == 2 ? localStyles.input.button.on : localStyles.input.button.off) )} onClick={this.changeImageSource.bind(null, 2)}>2 Dimensions</button>
				</div>
				<div style={{width: '100%', padding: '1em', height: '40%', display: 'flex', flexWrap: 'wrap', position: 'relative', borderRadius: 4}}>
					<div className='flxbx' style={localStyles.section.title}>
						<h4 style={{margin: 'auto 0'}}>{this.state.imageSource == 1 ? 'Simple - One Dimension' : 'Intermediate - Two Dimensions'}</h4>
					</div>
					<div className='col-6 col-lg-6 col-sm-6 col-md-6'>
						<hr />
						<WorkingGallery config={this.state.config} images={imageSource} />
					</div>
					<div className='col-6 col-lg-6 col-sm-6 col-md-6'>
						<div style={localStyles.config.table.row} className='flxbx flxwp'>
								<div style={{width: '100%'}}>Main Jewels</div>
								<div style={{}}>
									<div>Overlay</div>
									<div onClick={this.changeConfig.bind(null, 'main', 'overlay', !config['main'].overlay)} style={Object.assign({}, localStyles.input.bool.main, config['main'].overlay ? localStyles.input.bool.on : localStyles.input.bool.off)} />
								</div>
								<div>
									<div>Layout</div>
									<button style={Object.assign({}, localStyles.input.button.main, (this.isConfigSet('main', 'orientation', 'vertical') ? localStyles.input.button.on : localStyles.input.button.off) )} type="submit" onClick={this.changeConfig.bind(null, 'main', 'orientation', 'vertical')}>Vertical</button>
									<button style={Object.assign({}, localStyles.input.button.main, (this.isConfigSet('main', 'orientation', 'horizontal') ? localStyles.input.button.on : localStyles.input.button.off) )} type="submit" onClick={this.changeConfig.bind(null,  'main', 'orientation', 'horizontal')}>Horizontal</button>
								</div>
								<div>
									<div>Y Axis</div>
									<button style={Object.assign({}, localStyles.input.button.main, (this.isConfigSet('main', 'posY', 'top') ? localStyles.input.button.on : localStyles.input.button.off) )} type="submit" onClick={this.changeConfig.bind(null, 'main', 'posY', 'top')}>Top</button>
									<button style={Object.assign({}, localStyles.input.button.main, (this.isConfigSet('main', 'posY', 'bot') ? localStyles.input.button.on : localStyles.input.button.off) )} type="submit" onClick={this.changeConfig.bind(null, 'main', 'posY', 'bot')}>Bot</button>
								</div>
								<div>
									<div>X Axis</div>
									<button style={Object.assign({}, localStyles.input.button.main, (this.isConfigSet('main', 'posX', 'left') ? localStyles.input.button.on : localStyles.input.button.off) )} type="submit" onClick={this.changeConfig.bind(null, 'main', 'posX', 'left')}>Left</button>
									<button style={Object.assign({}, localStyles.input.button.main, (this.isConfigSet('main', 'posX', 'right') ? localStyles.input.button.on : localStyles.input.button.off) )} type="submit" onClick={this.changeConfig.bind(null, 'main', 'posX', 'right')}>Right</button>
								</div>
								<div style={localStyles.config.table.row} className='flxbx flxwp'>
									<div style={localStyles.config.setting.wrap}>
										<div style={localStyles.config.setting.wrap} className='flxbx'>
											<div style={localStyles.config.setting.title}>Spacing</div>
											<input style={localStyles.input.text} onChange={this.handleTextChange.bind(null, 'main', 'spacing')} type="text" value={config['main']['spacing']} />
										</div>
										<input onChange={this.handleSlider.bind(null, 'main', 'spacing')} style={localStyles.input.slider.wrap} type="range" id="weight" min={0} value={config['main']['spacing']} max={100} step={1} />
									</div>
									<div style={localStyles.config.setting.wrap}>
										<div style={localStyles.config.setting.wrap} className='flxbx'>
											<div style={localStyles.config.setting.title}>Size</div>
											<input style={localStyles.input.text} onChange={this.handleTextChange.bind(null, 'main', 'size')} type="text" value={config['main']['size']} />
										</div>
										<input onChange={this.handleSlider.bind(null, 'main', 'size')} style={localStyles.input.slider.wrap} type="range" id="weight" min={0} value={config['main']['size']} max={100} step={1} />
									</div>
								</div>
								<div style={localStyles.config.table.row} className='flxbx flxwp'>
									<div style={localStyles.config.setting.wrap}>
										<div style={localStyles.config.setting.wrap} className='flxbx'>
											<div style={localStyles.config.setting.title}>Highlight Color</div>
											<input style={localStyles.input.text} onChange={this.handleTextChange.bind(null, 'main', 'hlColor')} type="text" value={config['main']['hlColor']} />
										</div>
										<input style={localStyles.config.setting.color} onChange={this.handleTextChange.bind(null, 'main', 'hlColor')} type="color" id="weight" min={0} value={config['main']['hlColor']} max={100} step={1} />
									</div>
									<div style={localStyles.config.setting.wrap}>
										<div style={localStyles.config.setting.wrap} className='flxbx'>
											<div style={localStyles.config.setting.title}>Highlight Size</div>
											<input style={localStyles.input.text} onChange={this.handleTextChange.bind(null, 'main', 'hlSize')} type="text" value={config['main']['hlSize']} />
										</div>
										<input onChange={this.handleSlider.bind(null, 'main', 'hlSize')} style={localStyles.input.slider.wrap} type="range" id="weight" min={0} value={config['main']['hlSize']} max={100} step={1} />
									</div>
								</div>
						</div>
						{secondaryConfig}
					</div>
				</div>
				<hr />
				<div style={{padding: ''}} className='container'>

					<form style={{textAlign: 'center', margin: '1em'}} action="https://github.com/michaellyons/react-amazon-gallery">
							<button className={'button button1'} type="submit" value="View Github Project">View Github Project</button>
					</form>
					<div className='col-6 col-lg-6 col-sm-6 col-md-6' style={{padding: 0}}>
						<div style={codeSectionHeader}><h4>Usage</h4></div>
						<pre><code>{"import React from 'react';"}
								<br />{"import Gallery from 'react-amazon-gallery';"}
								<br /><br />{"let images = [-image-array-here-]';"}
								<br />{"let config = {-config-object-here};"}
								<br /><br />{"<"+"Gallery images={images} "+(Object.keys(filteredState).length > 0 ? 'config={config}' : '')+" />"}
								</code></pre>
						<div style={codeSectionHeader}><h4>1 Dimension Images</h4></div>
						<pre ><code dangerouslySetInnerHTML={createMarkup('let images1D = '+library.json.prettyPrint(imageArray)+';')}></code></pre>
						<div style={codeSectionHeader}><h4>2 Dimension Images</h4></div>
						<pre ><code dangerouslySetInnerHTML={createMarkup('let images2D = '+library.json.prettyPrint(imageMDArray)+';')}></code></pre>
					</div>
					<div className='col-6 col-lg-6 col-sm-6 col-md-6' style={{padding: 0}}>
						<div style={codeSectionHeader}><h4>Customization</h4></div>
						<pre ><code dangerouslySetInnerHTML={createMarkup('let default_config = '+library.json.prettyPrint(config)+';')}></code></pre>
					</div>
				</div>
			</div>
		</div>
		);
	}
});

export default App;


					//       <div style={codeSectionHeader}><h4>Prerequisites</h4></div>
					// <div>Use <a href='http://www.npmjs.org'>NPM</a> for package bundling and <a href='http://facebook.github.io/react/'>React JS</a></div>

