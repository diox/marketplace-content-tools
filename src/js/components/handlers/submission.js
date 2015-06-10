import FluxComponent from 'flummox/component';
import connectToStores from 'flummox/connect';
import React from 'react';

import Wizard from '../wizard';


const UrlStep = React.createClass({
  render() {
    const flux = this.props.flux;
    const onSubmit = e => {
      e.preventDefault();
      flux.getActions('submission').submitUrl(
        e.currentTarget.elements.submissionUrl.value);
      return false;
    };

    return <form className="form-inline submission--url-form"
                 onSubmit={onSubmit}>
      <label htmlFor="submission--url">URL:</label>
      <input id="submission--url" className="submission--url"
             name="submissionUrl" placeholder="Enter a website URL..."
             type="text" required/>
      <button type="submit">Submit</button>
    </form>
  }
});


const CompatStep = connectToStores(React.createClass({
  render() {
    return <div className="submission--metadata">
      <form className="form-block">
        <div className="form-block--group">
          <label>URL</label>
          <input type="text" value={this.props.url} disabled={true}/>
        </div>

        <div className="form-block--group">
          <label htmlFor="submission--keywords">Keywords</label>
          <input id="submission--keywords" name="keywords" type="text"/>
        </div>

        <div className="form-block--group">
          <label htmlFor="submission--description">Description</label>
          <textarea id="submission--description" name="description" type="text"
                    rows="10"/>
        </div>
      </form>

      <img className="submission--screenshot" src={this.props.screenshot}/>
    </div>
  }
}), 'submission');


const MetadataStep = React.createClass({
  render() {
    return <form>
      <p>Under construction</p>
    </form>
  }
});


const Submission = React.createClass({
  render() {
    const steps = [
      {
        title: 'Step 1: Website URL',
        form: <FluxComponent>
                <UrlStep/>
              </FluxComponent>
      },
      {
        title: 'Step 2: Website Compatibility',
        form: <FluxComponent connectToStores={'submission'}>
                <CompatStep/>
              </FluxComponent>
      },
      {
        title: 'Step 3: Website Metadata',
        form: <FluxComponent connectToStores={'submission'}>
                <MetadataStep/>
              </FluxComponent>
      }
    ];

    const submitActions = this.props.flux.getActions('submission');
    const goToStep = i => () => {submitActions.goToStep(i)};

    return <FluxComponent connectToStores={'submission'}>
      <Wizard className="submission" steps={steps}
              goToPrevStep={submitActions.goToPrevStep}
              goToNextStep={submitActions.goToNextStep}
              goToStep={goToStep}/>
    </FluxComponent>
  }
});


export default Submission;
