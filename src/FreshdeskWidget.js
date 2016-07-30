import React, { Component, PropTypes } from 'react';

class FreshdeskWidget extends Component {
    constructor(props) {
        super(props);

        this.renderPopUp = this.renderPopUp.bind(this);
        this.renderWithChildren = this.renderWithChildren.bind(this);
        this.renderIncorporated = this.renderIncorporated.bind(this);
    }

    getFreshdeskWidgetSDK(callback) {
        const script = document.createElement('script');

        script.src = 'https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.js';
        script.type = 'text/javascript';
        script.onload = callback;

        document.body.appendChild(script);
    }

    getAlignmentByPositionLabel(label) {
        const alignments = {
            left: 4,
            right: 2,
            top: 1,
            bottom: 3
        };

        return alignments[label];
    }

    renderWithChildren() {
        const {
            url,
            formTitle,
            formHeight,
            submitThanks
        } = this.props;

        const queryString = `&widgetType=popup&formTitle=${formTitle}&submitThanks=${submitThanks}`;

        const params = {
            utf8: '✓',
            widgetType: 'popup',
            url,
            formTitle,
            formHeight,
            submitThanks,
            queryString,
            // thanks freshdesk for this
            offset: '-3000px'
        };

        const handleClick = () => {
            this.getFreshdeskWidgetSDK(() => {
                window.FreshWidget.init('', params);

                setTimeout(() => {
                    window.FreshWidget.create();
                    window.FreshWidget.show();
                }, 100);
            });
        };

        const childrenWithHandleClick = React.cloneElement(
            this.props.children,
            {
                onClick: handleClick.bind(this)
            }
        );

        return <div>{childrenWithHandleClick}</div>;
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

        const queryString = `&widgetType=popup&formTitle=${formTitle}&submitThanks=${submitThanks}`;
        const params = {
            utf8: '✓',
            widgetType: 'popup',
            alignment: this.getAlignmentByPositionLabel(buttonPosition),
            offset: buttonOffset,
            buttonBg: buttonBackgroundColor,
            backgroundImage: buttonBackgroundImage,
            url,
            buttonType,
            buttonText,
            buttonColor,
            submitThanks,
            formHeight,
            formTitle,
            queryString
        };

        this.getFreshdeskWidgetSDK(() => window.FreshWidget.init('', params));

        return <div id="freshdesk"></div>;
    }

    renderIncorporated() {
        const { url, formTitle, formHeight, submitThanks } = this.props;

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

    render() {
        const hasChildElement = (React.Children.count(this.props.children) >= 1);

        const { type } = this.props;

        if (type === 'incorporated') {
            return this.renderIncorporated();
        }

        if (hasChildElement) {
            return this.renderWithChildren();
        }

        return this.renderPopUp();
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
    formHeight: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])

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
    buttonOffset: '235px',
    children: null
};

export default FreshdeskWidget;
