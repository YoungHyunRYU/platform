import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const stories = [
  { 
    id: '1', 
    user: '멍..보리', 
    image: require('./assets/boriPic/boriSto_1.png') 
  },
  { 
    id: '2', 
    user: '족발 뼈 먹방 보리', 
    image: require('./assets/boriPic/boriSto_2.png') 
  },
  { 
    id: '3', 
    user: '동그라미 보리', 
    image: require('./assets/boriPic/boriSto_3.png') 
  },
  { 
    id: '4', 
    user: '해피 보리', 
    image: require('./assets/boriPic/boriSto_4.png') 
  },
  { 
    id: '5', 
    user: '지쳤다 보리', 
    image: require('./assets/boriPic/boriSto_5.png') 
  }
];

const posts = [
  { id: '1', user: '너 뭐야 ?', image: 'https://i.ytimg.com/vi/QP5MFjq98lU/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBH359e3WcnU8N6az1RHzmYQW9WxA', caption: '덤벼라 오리야 #일단 #덤벼보기' },
  { id: '2', user: '일단 먹고 생각해', image: 'https://i.ytimg.com/vi/bxMiaCQI8FQ/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAWfhF772IbhhIc-yo4B7h2mW7SyA', caption: '안녕하세요 여러분 오늘의 먹방은 묵어채 #먹방 #맛집' },
  { id: '3', user: '쭈그리', image: 'https://i.ytimg.com/vi/3AxUdr13G3w/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhlIGEoWDAP&rs=AOn4CLAJqsmTEDl7cYdFBemgKIsH9IKgYA', caption: '물만 튀지 말아다오.. #샤워싫어' },
  { id: '4', user: '프로펠러 가동', image: 'https://i.ytimg.com/vi/fhCPN9dbpRo/oar2.jpg?sqp=-oaymwEdCJUDENAFSFWQAgHyq4qpAwwIARUAAIhCcAHAAQY=&rs=AOn4CLDzdsRGNj-2EWuqWw0KunMyYf8apg', caption: '언니 왔어 ?? #프로펠러 #날아간다 #입맛다시기' },
  { id: '5', user: '잠온다..', image: 'https://i.ytimg.com/vi/6CGGxxR3glo/oar2.jpg?sqp=-oaymwEdCJUDENAFSFWQAgHyq4qpAwwIARUAAIhCcAHAAQY=&rs=AOn4CLC6a0o_yksNhfWSKEf9ew_J62VO6g', caption: '이불 덮어줘 #그윽한눈빛' },
];

const Story = ({ user, image }) => (
  <View style={styles.story}>
    <Image source={image} style={styles.storyImage} />
    <Text style={styles.storyUser}>{user}</Text>
  </View>
);

const Post = ({ user, image, caption }) => (
  <View style={styles.post}>
    <View style={styles.header}>
      <Text style={styles.username}>{user}</Text>
    </View>
    <Image source={{ uri: image }} style={styles.image} />
    <Text style={styles.caption}>{caption}</Text>
  </View>
);

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text style={{padding:5, color:'skyblue', fontWeight:'bold', fontSize:30}}>
          <Icon name="paw" size={30} color="#88C5F3"/>
            Bori stargram
          <Icon name="paw" size={30} color="#88C5F3" />
        </Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.storiesContainer}>
          <FlatList
            data={stories}
            horizontal
            renderItem={({ item }) => <Story user={item.user} image={item.image} />}
            keyExtractor={item => item.id}
          />
        </View>
        <FlatList
          data={posts}
          renderItem={({ item }) => <Post user={item.user} image={item.image} caption={item.caption} />}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const SearchScreen = () => (
  <View style={styles.centerScreen}>
    <Text>검색</Text>
  </View>
);

const AddPostScreen = () => (
  <View style={styles.centerScreen}>
    <Text>게시물 추가</Text>
  </View>
);

const NotificationsScreen = () => (
  <View style={styles.centerScreen}>
    <Text>알림</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.centerScreen}>
    <Text>프로필</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === '홈') {
              iconName = 'home';
            } else if (route.name === '검색') {
              iconName = 'search';
            } else if (route.name === '추가') {
              iconName = 'plus-square';
            } else if (route.name === '알림') {
              iconName = 'heart';
            } else if (route.name === '프로필') {
              iconName = 'user';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#88C5F3',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="홈" component={HomeScreen} />
        <Tab.Screen name="검색" component={SearchScreen} />
        <Tab.Screen name="추가" component={AddPostScreen} />
        <Tab.Screen name="알림" component={NotificationsScreen} />
        <Tab.Screen name="프로필" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  storiesContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  story: {
    alignItems: 'center',
    marginRight: 10,
  },
  storyImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  storyUser: {
    marginTop: 5,
    fontSize: 12,
  },
  post: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 300,
  },
  caption: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;