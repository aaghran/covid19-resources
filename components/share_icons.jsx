import React from "react";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  EmailShareButton
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  PinterestIcon,
  EmailIcon
} from "react-share";

export default class ShareIcons extends React.Component {
  render() {
    const shareUrl = `${this.props.shareUrl}`;
    const title = this.props.title;
    return (
      <div className="social-icons">
        <div className="each-icon">
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="facebook-share"
          >
            <FacebookIcon size={25} round />
          </FacebookShareButton>
        </div>
        <div className="each-icon">
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="twitter-share"
          >
            <TwitterIcon size={25} round />
          </TwitterShareButton>
        </div>
        <div className="each-icon">
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={25} round />
          </WhatsappShareButton>
        </div>
        <div className="each-icon">
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            windowWidth={750}
            windowHeight={600}
            className="Demo__some-network__share-button"
          >
            <LinkedinIcon size={25} round />
          </LinkedinShareButton>
        </div>
      </div>
    );
  }
}
