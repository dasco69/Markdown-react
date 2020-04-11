
import React from 'react';
import {render} from 'react-dom';

//JS
import { sampleText } from './sampleText';
//MARKED.JS
import marked from 'marked';
//CSS
import './style/css/bootstrap.min.css';

import './index.css';
//On créer l'application web
class App extends React.Component{

    state = {
        text: sampleText
    };
    //monte la modification
    componentWillMount() {
		// Se lance juste avant le rendu
		const localStorageText = localStorage.getItem('text');

		if (localStorageText) {
			this.setState({
				text: localStorageText
			});
		}
	}
    //Sauvegarde les modifications 
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('text', nextState.text);
    };

//Function
    editText = (event) => {
        const text = event.target.value;
        this.setState({text});
    }

    renderText = (text) => {
        const renderText = marked(text, {sanitize: true});
        return { __html: renderText}
    }


//On retourne le jsx
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <textarea 
                            value={this.state.text} 
                            rows="25" 
                            className="form-control"
                            onChange={(e) => this.editText(e)}
                            >

                        </textarea>
                    </div>

                    <div className="col-sm-6">
                        <div dangerouslySetInnerHTML={this.renderText(this.state.text)}/>
                    </div>
                </div>
            </div>
        )
    }
}
render(
    <App />,
    document.getElementById('root')
);