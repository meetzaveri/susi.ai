import './Settings.css';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import ShareOnSocialMedia from './ShareOnSocialMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled, { css } from 'styled-components';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import ThemeIcon from '@material-ui/icons/InvertColors';
import VoiceIcon from '@material-ui/icons/SettingsVoice';
import ChevronRight from '@material-ui/icons/ChevronRight';
import SpeechIcon from '@material-ui/icons/RecordVoiceOver';
import AccountIcon from '@material-ui/icons/AccountBox';
import LockIcon from '@material-ui/icons/Lock';
import MyDevices from '@material-ui/icons/Devices';
import MobileIcon from '@material-ui/icons/PhoneAndroid';
import ShareIcon from '@material-ui/icons/Share';

import MicrophoneTab from './MicrophoneTab.react';
import ThemeChangeTab from './ThemeChangeTab.react';
import SpeechTab from './SpeechTab.react';
import AccountTab from './AccountTab.react';
import PasswordTab from './PasswordTab.react';
import DevicesTab from './DevicesTab';
import MobileTab from './MobileTab.react';
import ChatAppTab from './ChatAppTab.react';
import { bindActionCreators } from 'redux';
import settingActions from '../../redux/actions/settings';

const settingsOptions = [
  { name: 'Account', icon: <AccountIcon /> },
  { name: 'Password', icon: <LockIcon /> },
  { name: 'Mobile', icon: <MobileIcon /> },
  { name: 'ChatApp', icon: <ChatIcon /> },
  { name: 'Theme', icon: <ThemeIcon /> },
  { name: 'Microphone', icon: <VoiceIcon /> },
  { name: 'Speech', icon: <SpeechIcon /> },
  { name: 'Devices', icon: <MyDevices /> },
  { name: 'Share on social media', icon: <ShareIcon /> },
];

const Container = styled.div`
  width: 100%;
  height: 117vh;
  margin-top: 2rem;
  background: ${props => (props.theme === 'dark' ? '#000012' : '#f2f2f2')};
  @media only screen and (max-width: 1060px) {
    height: 100vh;
  }
`;

const SettingContainer = styled.div`
  display: flex;
  padding: 50px 0;
  max-width: 95%;
  width: 1060px;
  margin: 0 auto;
  @media only screen and (max-width: 1060px) {
    flex-direction: column;
  }
`;

const SettingsOptionsContainer = styled(Paper)`
  width: 28%;
  overflow: hidden;
  margin-right: 12px;
  height: fit-content;
  ${props =>
    props.theme === 'dark'
      ? css`
          background: #19324c;
          color: #ffffff;
        `
      : css`
        background: #FFFFFF
        color: #272727;
  `};

  @media only screen and (max-width: 1060px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const SettingsListContainer = styled.div`
  padding: 0px 0px;
  user-select: none;
  width: 100%;

  @media only screen and (max-width: 1060px) {
    display: none;
  }
`;

const MenuList = styled(_MenuList)`
  padding: 0;
`;

const SettingsBodyContainer = styled(Paper)`
  width: 70%;
  ${props =>
    props.theme === 'dark'
      ? css`
          background: #19324c;
          color: #ffffff;
        `
      : css`
        background: #FFFFFF
        color: #272727;
  `};

  @media only screen and (max-width: 1060px) {
    height: auto;
    width: 100%;
  }
`;

const SettingsDropDownContainer = styled.div`
  user-select: none;
  display: none;
  margin: 0.5rem auto;
  padding: 0 1.5rem;

  @media only screen and (max-width: 1060px) {
    display: block;
  }
`;

const SettingsMenuItem = styled(MenuItem)`
  width: 322px;

  @media only screen and (max-width: 1060px) {
    width: 100%;
  }
`;

const LoadingContainer = styled.div`
  height: 432px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Settings extends Component {
  constructor(props) {
    super(props);
    if ('speechSynthesis' in window) {
      this.TTSBrowserSupport = true;
    } else {
      this.TTSBrowserSupport = false;
      console.warn(
        'The current browser does not support the SpeechSynthesis API.',
      );
    }
    this.state = {
      selectedSetting: 'Account',
      theme: this.props.theme,
      loading: true,
    };
  }

  componentDidMount() {
    const { accessToken, actions, theme } = this.props;
    if (accessToken) {
      actions.getUserSettings().then(({ payload }) => {
        this.setState({ loading: false, theme });
      });
    }
    document.title =
      'Settings - SUSI.AI - Open Source Artificial Intelligence for Personal Assistants, Robots, Help Desks and Chatbots';
  }

  // When change tab from theme
  resetThemeOnTabChange = () => {
    const { theme, customThemeValue } = this.props;
    this.setState({
      theme,
      customThemeValue: { ...customThemeValue },
    });
  };

  // Handle change to theme settings
  handleThemeChange = (evt, value) => {
    this.setState({ theme: value });
  };

  loadSettings = (evt, value) => {
    if (this.state.selectedSetting === 'Theme') {
      this.resetThemeOnTabChange();
    }
    this.setState({
      selectedSetting: evt.target.innerText || evt.target.value,
    });
  };

  generateMenu = () => {
    const { theme, selectedSetting } = this.state;
    return settingsOptions.map(eachOption => (
      <MenuItem
        key={eachOption.name}
        onClick={this.loadSettings}
        style={{
          color: theme === 'dark' ? '#fff' : '#272727',
          borderBottom:
            theme === 'light' ? '1px solid #f2f2f2' : '1px solid #ffffff',
        }}
        selected={selectedSetting === eachOption.name}
      >
        <ListItemIcon>{eachOption.icon}</ListItemIcon>
        <ListItemText primary={eachOption.name} />
        <ChevronRight />
      </MenuItem>
    ));
  };

  generateDropDownMenu = () => {
    return settingsOptions.map(eachOption => {
      return (
        <SettingsMenuItem key={eachOption.name} value={eachOption.name}>
          {eachOption.name}
        </SettingsMenuItem>
      );
    });
  };

  generateSettings = () => {
    const { selectedSetting } = this.state;
    switch (selectedSetting) {
      case 'Microphone': {
        return <MicrophoneTab />;
      }
      case 'Share on social media': {
        return <ShareOnSocialMedia />;
      }
      case 'Theme': {
        return (
          <ThemeChangeTab
            handleThemeChange={this.handleThemeChange}
            theme={this.state.theme}
          />
        );
      }
      case 'Speech': {
        return <SpeechTab />;
      }
      case 'Account': {
        return <AccountTab />;
      }
      case 'Password': {
        return <PasswordTab />;
      }
      case 'Devices': {
        return <DevicesTab />;
      }
      case 'Mobile': {
        return <MobileTab />;
      }
      case 'ChatApp': {
        return <ChatAppTab />;
      }
      default:
        return null;
    }
  };

  render() {
    const { selectedSetting, theme, loading } = this.state;

    let menuItems = (
      <React.Fragment>
        <SettingsListContainer>
          <MenuList>{this.generateMenu()}</MenuList>
        </SettingsListContainer>
        <SettingsDropDownContainer>
          <Select
            onChange={this.loadSettings}
            value={selectedSetting}
            style={{ width: '100%' }}
            autoWidth={false}
          >
            {this.generateDropDownMenu()}
          </Select>
        </SettingsDropDownContainer>
      </React.Fragment>
    );

    return (
      <Container theme={theme}>
        <SettingContainer>
          <SettingsOptionsContainer theme={theme}>
            {menuItems}
          </SettingsOptionsContainer>
          <SettingsBodyContainer theme={theme}>
            {loading ? (
              <LoadingContainer>
                <CircularProgress size={64} />
              </LoadingContainer>
            ) : (
              this.generateSettings()
            )}
          </SettingsBodyContainer>
        </SettingContainer>
      </Container>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.object,
  theme: PropTypes.string,
  customThemeValue: PropTypes.object,
  accessToken: PropTypes.string,
  actions: PropTypes.object,
};

function mapStateToProps(store) {
  return {
    mapKey: store.app.apiKeys,
    theme: store.settings.theme,
    customThemeValue: store.settings.customThemeValue,
    accessToken: store.app.accessToken,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(settingActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
