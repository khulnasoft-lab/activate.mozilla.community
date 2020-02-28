import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Localized } from 'fluent-react/compat';
import { Navbar, Nav, NavItem, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { changeLocalesWithURL } from '../actions/language.js';

import './Header.css';

class Header extends Component {
  render () {
    const {
      availableLocales,
      currentLocales,
      changeLocalesWithURL,
    } = this.props;

    const currentLocale = this.props.currentLocales[0];

    return (
      <>
        <section className="warning-top">
          <p>
            <strong>Attention:</strong> All of the activities and campaigns from Activate will be migrating
            to the new Community Portal in March 2020. Starting in April this URL will redirect
            you to <a href="https://community.mozilla.org/">community.mozilla.org</a>. If you
            have any questions checkout the <a href="https://discourse.mozilla.org/t/frequently-asked-questions-portal-edition-faq/43224">FAQ</a>.
          </p>
        </section>
        <Navbar
          className="header js-header is-closed"
          collapseOnSelect
          onToggle={
            (event) => {
              document.getElementsByClassName('js-header')[0].classList.toggle('is-closed');
              document.getElementsByClassName('js-header')[0].classList.toggle('is-open');
            }
          }
        >
          <Navbar.Header className="header_logo">
            <Navbar.Brand>
              <Link to={`/${currentLocale}`} title="Mozilla Activate">
                <img src="/logo.svg" alt="Mozilla Activate logo" className="logo" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle data-toggle="collapse" data-target=".header_logo" />
          </Navbar.Header>
          <Navbar.Collapse className="header__menu" >
            <Navbar.Form className="language-selector" pullRight id="lang_form">
              <FormGroup controlId="language-select">
                <div className="header__select">

                  <ControlLabel className='element-invisible'>
                    <Localized id="nav-select-language"></Localized>
                  </ControlLabel>
                  <FormControl
                    componentClass="select"
                    placeholder={currentLocales[0]}
                    onChange={(event) => changeLocalesWithURL(currentLocales[0], [event.target.value])}
                    name="lang"
                    defaultValue={currentLocales[0]}
                    id="language-select"
                  >
                    {
                      availableLocales.map((locale) => {
                        return (
                          <option key={locale} value={locale}>{locale}</option>
                        );
                      })
                    }
                  </FormControl>
                  <div className="header__select-arrow"></div>
                </div>
              </FormGroup>
            </Navbar.Form>
            <Nav pullRight>
              <LinkContainer exact className="page-link" to={`/${currentLocale}/campaigns`} activeClassName={'is-active'}
              >
                <NavItem>
                  <Localized id="nav-campaigns">
                    <span></span>
                  </Localized>
                </NavItem>
              </LinkContainer>
              <li className="page-link">
                <a href="https://community.mozilla.org/activities/">
                  <Localized id="nav-activities">
                    <span></span>
                  </Localized>
                </a>
              </li>
              <li className="page-link">
                <a href="https://community.mozilla.org/events/">
                  <Localized id="nav-events">
                    <span></span>
                  </Localized>
                </a>
              </li>
              <li className="page-link">
                <a href="https://community.mozilla.org/groups/">
                  <Localized id="nav-groups">
                    <span></span>
                  </Localized>
                </a>
              </li>
              <li className="page-link">
                <a href="https://community.mozilla.org/people/">
                  <Localized id="nav-people">
                    <span></span>
                  </Localized>
                </a>
              </li>
              <LinkContainer exact className="page-link" to={`/${currentLocale}/faq`} activeClassName={'is-active'}>
                <NavItem>
                  <Localized id="nav-faq">
                    <span></span>
                  </Localized>
                </NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentLocales: state.language.currentLocales,
  availableLocales: state.language.availableLocales,
});
const mapDispatchToProps = {
  changeLocalesWithURL,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Header);
