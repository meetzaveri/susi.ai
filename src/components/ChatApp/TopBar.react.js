import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import Exit from '@material-ui/icons/ExitToApp';
import SignUp from '@material-ui/icons/AccountCircle';
import Info from '@material-ui/icons/Info';
import Dashboard from '@material-ui/icons/Dashboard';
import List from '@material-ui/icons/List';
import Share from '@material-ui/icons/Share';
import Chat from '@material-ui/icons/Chat';
import Extension from '@material-ui/icons/Extension';
import Assessment from '@material-ui/icons/Assessment';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import susiWhite from '../../images/susi-logo-white.png';
import Translate from '../Translate/Translate.react';
import CircleImage from '../CircleImage/CircleImage';
import appActions from '../../redux/actions/app';
import uiActions from '../../redux/actions/ui';
import Link from '../shared/Link';
import ExpandingSearchField from './SearchField.react';
import AppBar from '@material-ui/core/AppBar';
import {
  StyledIconButton,
  UserDetail,
  SusiLogo,
  FlexContainer,
} from '../shared/TopBarStyles';

class TopBar extends Component {
  static propTypes = {
    handleChangePassword: PropTypes.func,
    handleOptions: PropTypes.func,
    handleRequestClose: PropTypes.func,
    handleToggle: PropTypes.func,
    searchTextChanged: PropTypes.func,
    openSearch: PropTypes.func,
    exitSearch: PropTypes.func,
    nextSearchItem: PropTypes.func,
    previousSearchItem: PropTypes.func,
    search: PropTypes.bool,
    searchState: PropTypes.object,
    header: PropTypes.string,
    email: PropTypes.string,
    accessToken: PropTypes.string,
    userName: PropTypes.string,
    isAdmin: PropTypes.bool,
    actions: PropTypes.object,
    avatarImg: PropTypes.string,
    history: PropTypes.object,
  };

  static defaultProps = {
    email: '',
    userName: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  componentDidMount() {
    this.setState({
      search: false,
    });
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  openModal = name => {
    const { actions } = this.props;
    this.handleClose();
    actions.openModal({ modalType: name });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const {
      searchState,
      search,
      searchTextChanged,
      exitSearch,
      openSearch,
      nextSearchItem,
      previousSearchItem,
      email,
      accessToken,
      userName,
      isAdmin,
      avatarImg,
      history,
    } = this.props;

    let appBarClass = 'app-bar';
    if (search) {
      appBarClass = 'app-bar-search';
    }

    let userAvatar = null;
    if (accessToken) {
      userAvatar = avatarImg;
    }

    return (
      <AppBar position="static">
        <Toolbar className={appBarClass} variant="dense">
          <div>
            <Link to="/" style={{ outline: '0' }}>
              <SusiLogo src={susiWhite} alt="susi-logo" />
            </Link>
          </div>
          <FlexContainer>
            <div>
              {searchState ? (
                <ExpandingSearchField
                  searchText={searchState.searchText}
                  searchIndex={searchState.searchIndex}
                  open={search}
                  searchCount={searchState.scrollLimit}
                  onTextChange={searchTextChanged}
                  activateSearch={openSearch}
                  exitSearch={exitSearch}
                  scrollRecent={nextSearchItem}
                  scrollPrev={previousSearchItem}
                />
              ) : null}
            </div>
            {accessToken && (
              <StyledIconButton onClick={() => history.push('/settings')}>
                <FlexContainer>
                  <CircleImage src={userAvatar} size="32" />
                  <UserDetail>{!userName ? email : userName}</UserDetail>
                </FlexContainer>
              </StyledIconButton>
            )}
            {/* Pop over menu */}
            <IconButton
              aria-owns={open ? 'menu-popper' : undefined}
              aria-haspopup="true"
              color="inherit"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu-popper"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              getContentAnchorEl={null}
              transitionDuration={0}
            >
              <MenuItem key="placeholder" style={{ display: 'none' }} />
              {accessToken && (
                <Link to="/skills/dashboard">
                  <MenuItem onClick={this.handleClose}>
                    <ListItemIcon>
                      <Assessment />
                    </ListItemIcon>
                    <ListItemText>
                      <Translate text="Dashboard" />
                    </ListItemText>
                  </MenuItem>
                </Link>
              )}
              <Link to="/chat">
                <MenuItem onClick={this.handleClose}>
                  <ListItemIcon>
                    <Chat />
                  </ListItemIcon>
                  <ListItemText>
                    <Translate text="Chat" />
                  </ListItemText>
                </MenuItem>
              </Link>
              <Link to="/skills">
                <MenuItem onClick={this.handleClose}>
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText>
                    <Translate text="Skills" />
                  </ListItemText>
                </MenuItem>
              </Link>
              {accessToken && (
                <Link to="/skills/botbuilder">
                  <MenuItem onClick={this.handleClose}>
                    <ListItemIcon>
                      <Extension />
                    </ListItemIcon>
                    <ListItemText>
                      <Translate text="Botbuilder" />
                    </ListItemText>
                  </MenuItem>
                </Link>
              )}
              {accessToken && (
                <Link to="/settings">
                  <MenuItem onClick={this.handleClose}>
                    <ListItemIcon>
                      <Settings />
                    </ListItemIcon>
                    <ListItemText>
                      <Translate text="Settings" />
                    </ListItemText>
                  </MenuItem>
                </Link>
              )}
              <Link to="/">
                <MenuItem onClick={this.handleClose}>
                  <ListItemIcon>
                    <Info />
                  </ListItemIcon>
                  <ListItemText>
                    <Translate text="About" />
                  </ListItemText>
                </MenuItem>
              </Link>
              {accessToken && isAdmin && (
                <Link to="/admin">
                  <MenuItem onClick={this.handleClose}>
                    <ListItemIcon>
                      <List />
                    </ListItemIcon>
                    <ListItemText>
                      <Translate text="Admin" />
                    </ListItemText>
                  </MenuItem>
                </Link>
              )}
              <MenuItem onClick={() => this.openModal('share')}>
                <ListItemIcon>
                  <Share />
                </ListItemIcon>
                <ListItemText>
                  <Translate text="Share" />
                </ListItemText>
              </MenuItem>
              {accessToken ? (
                <Link to="/logout">
                  <MenuItem onClick={this.handleClose}>
                    <ListItemIcon>
                      <Exit />
                    </ListItemIcon>
                    <ListItemText>
                      <Translate text="Logout" />
                    </ListItemText>
                  </MenuItem>
                </Link>
              ) : (
                <MenuItem onClick={() => this.openModal('login')}>
                  <ListItemIcon>
                    <SignUp />
                  </ListItemIcon>
                  <ListItemText>
                    <Translate text="Login" />
                  </ListItemText>
                </MenuItem>
              )}
            </Menu>
          </FlexContainer>
        </Toolbar>
      </AppBar>
    );
  }
}

function mapStateToProps(store) {
  const { email, accessToken, isAdmin, avatarImg } = store.app;
  const { userName } = store.settings;
  return {
    email,
    accessToken,
    userName,
    isAdmin,
    avatarImg,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...appActions, ...uiActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBar);
