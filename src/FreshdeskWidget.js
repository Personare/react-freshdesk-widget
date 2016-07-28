import React, { Component, PropTypes } from 'react';

class FreshdeskWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rendered: false
        };
    }

    componentDidMount() {
        const { type } = this.props;

        this.getFreshdeskWidgetSDK(() => {
            if (type === 'pop-up') {
                this.renderPopUp();
            }
        });
    }

    getFreshdeskWidgetSDK(callback) {
        const script = document.createElement('script');

        script.src = 'https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.js';
        script.type = 'text/javascript';
        script.async = true;
        script.onload = callback;

        document.body.appendChild(script);
    }

    getStylesheet() {
        const style = document.createElement('link');
        style.href = 'https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.css';
        style.rel = 'stylesheet';
        style.media = 'screen, projection';
        document.body.appendChild(style);
    }

    renderPopUp() {
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

        const alignments = {
            left: 4,
            right: 2,
            top: 1,
            bottom: 3
        };

        const params = {
            queryString: `&widgetType=popup&formTitle=${formTitle}&submitThanks=${submitThanks}`,
            utf8: '✓',
            widgetType: 'popup',
            alignment: alignments[buttonPosition],
            offset: buttonOffset,
            buttonBg: buttonBackgroundColor,
            backgroundImage: buttonBackgroundImage,
            url,
            buttonType,
            buttonText,
            buttonColor,
            submitThanks,
            formHeight,
            formTitle
        };

        window.FreshWidget.init('', params);

        this.setState({
            rendered: true
        });
    }

    render() {
        const { type, url, formTitle, formHeight, submitThanks } = this.props;

        if (type === 'incorporated') {
            this.getStylesheet();

            const widgetUrl = `${url}/widgets/feedback_widget/new?`;

            const queryString = [
                'widgetType=embedded',
                'screenshot=no',
                `formTitle=${formTitle}`,
                `formHeight=${formHeight}`,
                `submitThanks=${submitThanks}`
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
                        width="100%"
                    />
                </div>
            );
        }

        return <div id="freshwidget"></div>;
    }
}


FreshdeskWidget.propTypes = {
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
    formHeight: PropTypes.string
};

FreshdeskWidget.defaultProps = {
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

export default FreshdeskWidget;
