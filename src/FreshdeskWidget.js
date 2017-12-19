import React, { Component } from 'react';
import PropTypes from 'prop-types';

require('./object-values-entries-polyfill');

class FreshdeskWidget extends Component {
    constructor(props) {
        super(props);

        this.renderPopUp = this.renderPopUp.bind(this);
        this.renderWithChildren = this.renderWithChildren.bind(this);
        this.renderIncorporated = this.renderIncorporated.bind(this);
    }

    componentWillMount() {
        const script = document.createElement('script');
        script.src = 'https://s3.amazonaws.com/assets.freshdesk.com/widget/freshwidget.js';
        script.type = 'text/javascript';
        document.body.appendChild(script);
    }

    componentWillUnmount() {
        const { type } = this.props;

        if (type === 'pop-up' && window.FreshWidget) {
            window.FreshWidget.destroy();
        }
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
            submitThanks,
            autofill,
        } = this.props;

        const autofills = Object.entries(autofill).
            map(([field, value]) => (`helpdesk_ticket[${field}]=${value}`));

        const queryString = [
            '&widgetType=popup',
            `formTitle=${formTitle}`,
            `submitThanks=${submitThanks}`,
            ...autofills,
        ].join('&');

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
            window.FreshWidget.init('', params);
            setTimeout(() => {
                window.FreshWidget.create();
                window.FreshWidget.show();
            }, 100);
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
            formHeight,
            autofill
        } = this.props;

        const autofills = Object.entries(autofill).
            map(([field, value]) => (`helpdesk_ticket[${field}]=${value}`));

        const queryString = [
            '&widgetType=popup',
            `formTitle=${formTitle}`,
            `submitThanks=${submitThanks}`,
            ...autofills,
        ].join('&');

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

        window.FreshWidget.init('', params);

        return <div id="freshdesk"></div>;
    }

    renderIncorporated() {
        const { url, formTitle, formHeight, submitThanks, autofill } = this.props;

        const widgetUrl = `${url}/widgets/feedback_widget/new?`;

        const autofills = Object.entries(autofill).
            map(([field, value]) => (`helpdesk_ticket[${field}]=${value}`));

        const queryString = [
            'widgetType=embedded',
            'screenshot=no',
            `formTitle=${formTitle}`,
            `formHeight=${formHeight}`,
            `submitThanks=${submitThanks}`,
            ...autofills,
        ].join('&');

        return (
            <div>
                <iframe
                    className="freshwidget-embedded-form"
                    frameBorder="0"
                    id="freshwidget-embedded-form"
                    src={widgetUrl + queryString}
                    scrolling="no"
                    height={formHeight}
                    width="100%"
                />
            </div>
        );
    }

    render() {
        const { type } = this.props;

        if (type === 'incorporated') {
            return this.renderIncorporated();
        }

        const hasChildElement = (React.Children.count(this.props.children) >= 1);

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
    autofill: PropTypes.objectOf(PropTypes.string),
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
    autofill: {},
    children: null
};

export default FreshdeskWidget;
