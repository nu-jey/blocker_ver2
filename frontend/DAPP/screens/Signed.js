import React, {
  useState, 

}from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  Pressable,
  Dimensions,
  Platform,
  ScrollView, 
  Image, 
} from 'react-native';
import {printToFileAsync} from 'expo-print';
import { shareAsync } from 'expo-sharing';
import Axios from 'axios';
import { HOSTNAME } from "@env";

const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;  //스크린 높이 초기화

function Signed({navigation, route}) {
  console.log(HOSTNAME);
  const contractors = JSON.parse(route.params.contractors); 
  const get_sign = async (contractor_id) => {
    const { data: result } = await Axios.post(HOSTNAME + '/get_sign_info', { id: contractor_id})
    setSignImgData_0(result); 
  }
  const [sign_img_data_0, setSignImgData_0] = useState("");
  const [sign_img_data_1, setSignImgData_1] = useState("");
  const [sign_img_data_2, setSignImgData_2] = useState("");
  const [sign_img_data_3, setSignImgData_3] = useState("");
  get_sign('Tempid2'); 

  const html = `
  <!DOCTYPE html>
  <html>
      <head>
          <title>계약서 양식</title>
          <style>
            .centered { display: table; margin-left: auto; margin-right: auto; text-align: center; }
            .contract_writer { text-align: right; }
          </style>
      </head>
      <body class="centered">
          <H1>
               ${route.params.title}
          </H1>
          <H3 class="contract_writer">
              작성자: ${route.params.id}
          </H3>
          <hr>
          <div>
              계약 참여자
              <table border="1">
                  <tbody>
                    <tr>
                          <td>${contractors.id[0]}</td>
                          <td>${contractors.id[1]}</td>
                          <td>${contractors.id[2]}</td>
                          <td>${contractors.id[3]}</td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <hr>
            계약 내용
            <br>
  
          <hr>
          <div>
              서명란
              <table border="1">
                  <thead>
                    <tr><th>${contractors.id[0]}</th><th>${contractors.id[1]}</th><th>${contractors.id[2]}</th><th>${contractors.id[3]}</th></tr>
                  </thead>
                  <tobdy>
                    <tr>
                          <td>${contractors.id[0]}</td><td><img src=${sign_img_data_0}></td>
                          <td>${contractors.id[1]}</td><td><img src=${sign_img_data_1}></td>
                      </tr>
                    <tr>
                          <td>${contractors.id[2]}</td><td><img src=${sign_img_data_2}></td>
                          <td>${contractors.id[3]}</td><td><img src=${sign_img_data_3}></td>
                      </tr>
                  </tobdy>
              </table>
          </div>
      </body>
  </html>
`;

  let generatePdf = async () => {
    //console.log(htmldata);
    const file = await printToFileAsync({
      html: html,
      base64 : true
    });
    //console.log(file);
    if(Platform.OS === "ios"){
      // ios인 경우 
      await shareAsync(file.uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }
    else{
      // 안드로이드인 경우 
      await shareAsync(file.uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.container_contract}>
        <View>
          <Text style={styles.textTitle}>{route.params.title}</Text>
        </View>
        <View>
          <Text style={styles.textWriter}>작성자: {route.params.id}</Text>     
        </View>
                
        <View style={styles.textContractors}>
          <Text>{contractors.id[0]}</Text>
          <Text>{contractors.id[1]}</Text>
          <Text>{contractors.id[2]}</Text>
          <Text>{contractors.id[3]}</Text>
        </View>

        <ScrollView style={styles.containerContent}>
          <Text style={styles.textContent}>{route.params.content}</Text>
        </ScrollView>

        
        <View style={styles.containerSign}>
          <Image source = {{uri: sign_img_data_0}} style={styles.imgSign}/>
          <Image source = {{uri: sign_img_data_0}} style={styles.imgSign}/>
          <Image source = {{uri: sign_img_data_0}} style={styles.imgSign}/>
          <Image source = {{uri: sign_img_data_0}} style={styles.imgSign}/>
        </View> 

      </View>

      <View style={styles.container_button}>
        <Pressable
              style={[styles.btn_contract_1]}
              onPress={() => alert("재계약")}
              >
          <Text style={styles.textStyle_btn}>RE-CON</Text>
        </Pressable>
        <Pressable
              style={[styles.btn_contract_2]}
              onPress={() => {
                generatePdf()
              }}
              >
          <Text style={styles.textStyle_btn}>PDF</Text>
        </Pressable>
        <Pressable
              style={[styles.btn_contract_3]}
              onPress={() => alert("계약파기")}
              >
          <Text style={styles.textStyle_btn}>CANCLE</Text>
        </Pressable>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#E7E6E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_contract: {
    flexDirection:'column',
    justifyContent:'flex-start',
    padding:"5%",
    width:"94%",
    height:"87%",
    margin: "3%",
    borderRadius:10,
    backgroundColor:"#FFFFFF",
  },
  container_button: {
    width: "100%",
    height: "10%",
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  textStyle_btn : {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', 
  },
  btn_contract_1: {
    width: Width* 0.3,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
    marginLeft: 10, 
  },
  btn_contract_2: {
    width: Width* 0.3,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
  },
  btn_contract_3: {
    width: Width* 0.3,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
    marginRight: 10, 
  },
  textTitle: {
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 25, 
  },
  textWriter: {
    textAlign: 'right', 
    marginTop: 5
  },
  textContractors: {
    flexDirection: "row",
    justifyContent: 'space-between',
    textAlign: 'center', 
    marginBottom: 20, 
    borderRadius: 5, 
    borderColor: "#2196F3",
    borderWidth: 3,
    padding: 3, 
  },
  containerContent:{
    backgroundColor:'#E7E6E6',
    borderRadius: 5, 
    padding: 3, 
  },
  containerSign:{
    flexDirection: "row",
    justifyContent: 'space-between',
    width: "100%", 
    height: Height* 0.1,
  },
  imgSign:{
    width: Width * 0.2,
    height: Width* 0.1,
    borderRadius: 10, 
    borderColor: "#939393",
    borderWidth: 1,
    marginTop: 5
  }
});

export default Signed;