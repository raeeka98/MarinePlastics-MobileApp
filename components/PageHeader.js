import React, {Component} from 'react';
import {Header, Left, Right, Body, Title, Icon} from 'native-base';

import headerStyles from './headerStyles'
/* Custom header to be used for every page in main navigation*/
export default class PageHeader extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <Header style={headerStyles.header}>
        <Left style={headerStyles.headerContents}>
          <Icon type='AntDesign' name={this.props.arrow? 'arrowleft' : 'menuunfold'} style={{color: 'white'}} onPress={this.props.openDrawer} />
        </Left>
        <Body style={headerStyles.headerContents}>
          <Title style={headerStyles.text}>{this.props.title}</Title>
        </Body>
        <Right></Right>
      </Header>
    )
  }


}
