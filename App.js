import React from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { Container, Content, Button, Text, StyleProvider,
         Header, Body, Title, List, ListItem, Left, Icon,
         Right, Footer, FooterTab, Item, Input, Spinner,
         Card, CardItem, Thumbnail, Image,
       } from 'native-base';

export default class App extends React.Component {
  state = {
    coins : [{
        coordinate: {
          latitude: 45.524698,
          longitude: -122.6655507,
        },
        id: "Second Best Place",
        description: "This is the second best place in Portland",
      },
      {
        coordinate: {
          latitude: 45.5230786,
          longitude: -122.6701034,
        },
        id: "Third Best Place",
        description: "This is the third best place in Portland",
      }],
    coinsLoaded : false,
    activeSearchBar : false,
    refreshing : false,
  };

  openSearch(){
    this.setState({
          activeSearchBar : true,
  })}

  search(){
    this.setState({
          activeSearchBar : false,
  })}

  updateContent() {
    this.setState({refreshing:true});
    this.fetchData();
    setTimeout(()=>{
        this.setState({refreshing:false});
    },2000);
  }

  fetchData(){
    return fetch('https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=5')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          coins : responseJson,
          coinsLoaded : true,
        //dataSource: this.state.dataSource.cloneWithRows(responseData.data),
        //dataLoaded: true,
        //refreshing: false,
      });
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount = async () => {
    this.fetchData();
  }



  render() {
    return (
        <Container>
          <Header searchBar rounded>
            {this.state.activeSearchBar ?
              [
              <Icon onPress={()=>this.search()} name="arrow-left" />,
              <Item>
                <Icon name="ios-search" />
                <Input placeholder="Search" />
              </Item>,
              <Button transparent onPress={()=>this.search()}>
                <Text>Search</Text>
              </Button>]
            :
              [<Left>
                <Button transparent>
                  <Icon name='menu' />
                </Button>
              </Left>,
              <Body>
                <Title>crypto</Title>
              </Body>,
              <Right>
                <Button transparent onPress={()=>this.openSearch()}>
                  <Icon name='search' />
                </Button>
              </Right>]
            }
          </Header>
          <Content
          refreshControl={<RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={()=>{this.updateContent()}}/>}
          >
            {this.state.coinsLoaded ?
              <List dataArray={this.state.coins}
              renderRow={(coin) =>
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail small source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}} />
                      <Body>
                        <Text>{coin.name}</Text>
                        <Text>{coin.symbol}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>
                        Position : {coin.rank}
                      </Text>
                        <Text>{coin.percent_change_1h}%</Text>
                          <Text>{coin.percent_change_24h}%</Text>
                          <Text>{coin.percent_change_7d}%</Text>
                    </Body>
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Button transparent textStyle={{color: '#87838B'}}>
                        <Icon name="logo-github" />
                        <Text>1,926 stars</Text>
                      </Button>
                    </Left>
                  </CardItem>
                </Card>
                }>
              </List>
            :
               <Spinner />
            }
          </Content>
          <Footer>
            <FooterTab>
              <Button full>
                <Text>Footer</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
