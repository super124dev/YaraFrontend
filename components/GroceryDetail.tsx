import React, {useState, useEffect} from 'react'
import {View, Text, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity, ImageBackground} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import NumericInput from 'react-native-numeric-input'
import axios from 'axios';
import { Avatar, Card, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/Feather';

const categoryData = [
    {
        title: 'Kiwi Fruit',
        imageUrl: require("./assets/fruit1.png")
    },{
        title: 'Apple',
        imageUrl: require("./assets/fruit2.png")
    },{
        title: 'Orange',
        imageUrl: require("./assets/fruit3.png")
    },{
        title: 'Kiwi Fruit',
        imageUrl: require("./assets/fruit4.png")
    },{
        title: 'Siaka Madagascar',
        imageUrl: require("./assets/fruit5.png")
    },{
        title: 'Apple',
        imageUrl: require("./assets/fruit1.png")
    },{
        title: 'Apple',
        imageUrl: require("./assets/fruit2.png")
    },{
        title: 'Apple',
        imageUrl: require("./assets/fruit3.png")
    },{
        title: 'Orange',
        imageUrl: require("./assets/fruit4.png")
    },{
        title: 'Orange',
        imageUrl: require("./assets/fruit5.png")
    },{
        title: 'Orange',
        imageUrl: require("./assets/fruit1.png")
    },{
        title: 'Orange',
        imageUrl: require("./assets/fruit2.png")
    },{
        title: 'Orange',
        imageUrl: require("./assets/fruit3.png")
    },{
        title: 'Orange',
        imageUrl: require("./assets/fruit4.png")
    },{
        title: 'Orange',
        imageUrl: require("./assets/fruit5.png")
    },{
        title: 'Apple',
        imageUrl: require("./assets/fruit1.png")
    },{
        title: 'Apple',
        imageUrl: require("./assets/fruit2.png")
    },{
        title: 'Apple',
        imageUrl: require("./assets/fruit3.png")
    },{
        title: 'Apple',
        imageUrl: require("./assets/fruit4.png")
    },{
        title: 'Apple',
        imageUrl: require("./assets/fruit5.png")
    },{
        title: 'Orange',
        imageUrl: require("./assets/fruit1.png")
    },{
        title: 'Apple',
        imageUrl: require("./assets/fruit2.png")
    },{
        title: 'Apple',
        imageUrl: require("./assets/fruit3.png")
    },{
        title: 'Apple',
        imageUrl: require("./assets/fruit4.png")
    },
]

const smallcategories = [{
        title: "Fruits",
        imageUrl: require("./assets/fruit1.png")
    },{
        title: "Vegetables",
        imageUrl: require("./assets/vegetableIcon.jpg")
    },{
        title: "Herbs",
        imageUrl: require("./assets/herbIcon.jpg")
    }
]

const width = Dimensions.get('window').width;
const GroceryDetail = ({route}:any) => {
    const navigation = useNavigation();
    const {groceryType} = route.params;
    const [countValue, setCountValue] = useState<any>([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    const [addStatus, setAddStatus] = useState<any>([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false])
    const [historyData, setHistoryData] = useState([]);
    const [totalCast, setTotalCast] = useState(0);
    const [smallCategory, setSmallCategory] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const total = await axios.post('http://41.63.177.113:80/addCart/getAllCart')
            setTotalCast(total.data.totalmoney)
        }
        fetchData();
    }, [])
    const onPressAdd = async (index: number, item:any) => {
        const data = await axios.post('http://41.63.177.113:80/addCart/changeProductCountByIndex', {productName: item.title, value: 1});
        let temp = addStatus;
        temp[index] = true;
        setAddStatus(temp.map((item:any) => {
            return item;
        }))
        const total = await axios.post('http://41.63.177.113:80/addCart/getAllCart')
        setTotalCast(total.data.totalmoney)
    }
    const onChangeNumberic = async (value: number, index: number, item : any) => {
        const data = await axios.post('http://41.63.177.113:80/addCart/changeProductCountByIndex', {productName: item.title, value: value});
        let temp = countValue;
        temp[index] = value;
        setCountValue(temp.map((item:number) => {
            return item;
        }));
        const total = await axios.post('http://41.63.177.113:80/addCart/getAllCart')
        setTotalCast(total.data.totalmoney)
    }
    return (
        <View style={styles.container}>
            <View style={{width: width * 0.95, flex: 1}}>
                <View style={{marginBottom: 5}}>
                    <FlatList
                        data={smallcategories}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => '*' + index}
                        renderItem={({ item, index }: {item: any, index: number}) => {
                            return (smallCategory !== index) ? <Card style={{ marginLeft: 5, marginRight: 5, backgroundColor: 'white', alignItems: 'center', flex: 1, justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 5}}>
                                <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center'}} onPress={() => setSmallCategory(index)}>
                                    <Image source={item.imageUrl} resizeMode='cover' style={{width: 30, height: 30}} />
                                    <Text style={{fontSize: 15, fontFamily: 'poppins_medium'}}>{item.title}</Text>
                                </TouchableOpacity>
                            </Card> : <Card style={{ marginLeft: 5, marginRight: 5, backgroundColor: 'white', alignItems: 'center', flex: 1, justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: '#918da5'}}>
                                <TouchableOpacity style={{ flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                                    <Image source={item.imageUrl} resizeMode='cover' style={{width: 30, height: 30}} />
                                    <Text style={{fontSize: 15, fontFamily: 'poppins_medium', color:'#918da5'}}>{item.title}</Text>
                                </TouchableOpacity>
                            </Card>
                        }}
                    />
                </View>
                <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', width: width * 0.9, alignItems: 'center', marginBottom: 5}}>
                    <Text style={{color: 'black', fontSize: 16, fontFamily:'poppins_medium'}}>All Grocery</Text>
                    <View style={{flexDirection: 'row', gap: 1, display: 'none'}}>
                        <Text style={{color: '#F1381D'}}>View all</Text>
                        <Icon2 name="chevron-right" size={20} color="#F1381D" />
                    </View>
                </View>
                <FlatList
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    data={categoryData}
                    renderItem={({item, index}) => (
                        <View key={index} style={{alignItems: 'center'}}>
                            <TouchableOpacity style={styles.viewStyle} onPress={() => navigation.navigate("GrocerySelect", {groceryName: item.title})}>
                                <ImageBackground source={item.imageUrl} resizeMode='cover' style={{width: width * 0.25, height: width * 0.25, borderRadius: 10, marginTop: 10}} >
                                    <TouchableOpacity style={{width: '100%', alignItems: 'flex-end'}}>
                                        <Icon2 name="heart" size={20} color={"#de1f27"} />
                                    </TouchableOpacity>
                                </ImageBackground>
                            </TouchableOpacity>
                            {addStatus[index] === false ? <View style={{alignItems: 'center', justifyContent: 'center', height: 50}}>
                                <TouchableOpacity activeOpacity={1} onPress={() => onPressAdd(index, item)} style={{ paddingVertical: 5,width: width * 0.22, alignItems: 'center', justifyContent: 'center', backgroundColor:'#d90008', borderRadius: 10}}><Text style={{color: 'white'}}>Add</Text></TouchableOpacity>
                            </View> : <View style={{padding: 0, alignItems: 'center', justifyContent: 'center'}}><NumericInput totalWidth={width * 0.22} totalHeight={60} inputStyle={{borderWidth: 0}} separatorWidth={0} textColor="black" containerStyle={{borderWidth: 0}} iconStyle={{color: 'white', backgroundColor: '#d90008', borderRadius: 5}} minValue={1} maxValue={999} rounded value={countValue[index]} onChange={value => onChangeNumberic(value, index, item)} /></View>}
                            <Text style={{color: '#F1381D', fontFamily: 'poppins_medium', width: width * 0.25, alignItems: 'flex-start', fontSize: 13}}>Rs. 300</Text>
                            <Text style={styles.groceryName}>{item.title}</Text>
                        </View>
                    )}
                />
                <View style={{alignItems: 'center', width: width * 0.9}}>
                    <Text style={{fontSize: 25, color: 'black'}}>Total    |    ${totalCast}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        backgroundColor: 'white'
    },
    viewStyle: {
        flex: 1,
        width: width * 0.3,
        height: width * 0.3,
        marginRight: width * 0.0083,
        marginLeft: width * 0.0083,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d7d7d7',
        borderRadius: 7,
        gap: 15,
    },
    groceryName: {
        width: width * 0.25, 
        fontFamily: "Poppins_medium",
        fontSize: 13,
        color: 'black',
        alignItems: 'flex-start',
        marginBottom: 20,
        flexWrap: 'wrap',
        height: 30
    },
})

export default GroceryDetail;