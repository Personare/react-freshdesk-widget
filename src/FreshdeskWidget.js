import React, { Component, PropTypes } from 'react';

class FreshdeskWidget extends Component {

    static propTypes = {
        url: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['pop-up', 'incorporated']),

        buttonType: PropTypes.oneOf(['text', 'image']),
        buttonText: PropTypes.string,
        buttonColor: PropTypes.string,
        buttonBackgroundColor: PropTypes.string,
        buttonBackgroundImage: PropTypes.string,
        buttonPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
        buttonOffset: PropTypes.string,

        formTitle: PropTypes.string,
        submitThanks: PropTypes.string,
        formHeight: PropTypes.string,

    };

    static defaultProps = {
        type: 'incorporated',
        formTitle: 'Help and support',
        submitThanks: 'Thank you, one of our representatives will respond to you soon! =)',
        formHeight: '500px',

        buttonType: 'text',
        buttonText: 'Support',
        buttonColor: 'white',
        buttonBackgroundColor: '#015453',
        buttonPosition: 'top',
        buttonOffset: '235px'
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { type } = this.props;

        this._getFreshdeskWidgetSDK(() => {
            if ('pop-up' === type) {
                this._renderPopUp();
            } else {
                this._getStylesheet();
            }
        });
    }

    _getFreshdeskWidgetSDK(callback) {
        const script = document.createElement('script');

        script.src = 'https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.js';
        script.type = 'text/javascript';
        script.async = true;
        script.onload = callback;

        document.body.appendChild(script);
    }

    _renderPopUp() {
        const {
            url,
            buttonType,
            buttonText,
            buttonColor,
            buttonBackgroundColor,
            buttonBackgroundImage,
            buttonPosition,
            buttonOffset,
            formTitle,
            submitThanks,
            formHeight
        } = this.props;

        const alignments = { left: 4, right: 2, top: 1, bottom: 3 };

        let params = {
            queryString: `&widgetType=popup&formTitle=${formTitle}&submitThanks=${submitThanks}`,
            url: url,
            utf8: "✓",
            widgetType: "popup",
            alignment: alignments[buttonPosition],
            offset: buttonOffset,
            buttonType: buttonType,
            buttonText: buttonText,
            buttonColor: buttonColor,
            buttonBg: buttonBackgroundColor,
            backgroundImage: buttonBackgroundImage,

            submitThanks: submitThanks,
            formHeight: formHeight,
            formTitle: formTitle
        };

        window.FreshWidget.init("", params);
    }

    _getStylesheet() {
        const style = document.createElement('link');
        style.href = 'https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.css';
        style.rel = 'stylesheet';
        style.media = 'screen, projection';
        document.body.appendChild(style);
    }

    render () {
        const { type, url, formTitle, formHeight, submitThanks } = this.props;

        if ('incorporated' === type) {
            const widgetUrl = `${url}/widgets/feedback_widget/new?`;

            const queryString = [
                'widgetType=embedded',
                'screenshot=no',
                'formTitle=' + formTitle,
                'formHeight=' + formHeight,
                'submitThanks=' + submitThanks
            ].join('&');

            return (
                <div>
                    <iframe
                        className="freshwidget-embedded-form"
                        frameBorder="0"
                        id="freshwidget-embedded-form"
                        src={widgetUrl + queryString}
                        scrolling="no"
                        height="500px"
                        width="100%">
                    </iframe>
                </div>
            );
        }

        return <div id="freshwidget"></div>;
    }
}

export default FreshdeskWidget;
