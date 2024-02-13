  
import './App.css' 
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'; 
import "moment/min/locales";
moment.locale("ar")

//let cancrlAxios = null;


const api = {
  key: "23b8c092b71bd981ef9d4ca69e4da24e",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [time , setTime] = useState("");
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
   const [weather, setWeather] = useState({});
   const [weatherdata, setWeatherdata] = useState({
    tem:null,
    description:"",
    minvalue:null,
    maxvalue:null,
    icon:"",
    windSpeed:null
   });

 
  const  handleSearchClicked = ()=>{
    setTime(moment().format('LLLL'));
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        let  description = result.weather[0].description;
        let iconresponse = result.weather[0].icon;
        const tempretuer = Math.round(result.main.temp);
        const maxTemp = Math.round(result.main.temp_max);
        const minTemp = Math.round(result.main.temp_min );
        const speed = Math.round(result.wind.speed);
        setWeatherdata(
          {
            description:description,
            tem:tempretuer,
            icon:`https://openweathermap.org/img/wn/${iconresponse}@2x.png`,
            minvalue:minTemp,
            maxvalue:maxTemp,
            windSpeed:speed 
          });
        setWeather(result);
      });
  }  
  const [local , setLocal] = useState("ar");
  function handleLanguageClicked() {
    if (local  == "en") {
      i18n.changeLanguage("ar");
      moment.locale("ar") 
      setLocal("ar");
    }else{
      i18n.changeLanguage("en");
      moment.locale("en"); 
      setLocal("en");
    }
    setTime(moment().format('LLLL'));
  }
   


  return (
<>
     <Container  className='main' maxWidth="lg">
        <h1 className='title'> {t("Time Weather 🌦")}</h1>
         <div dir={local==="en"?"rtl":"ltr"} className='sub'>
              <div style={{display:"flex" , justifyContent:"space-around" , alignItems:"end"}}>
                <h3>{time}</h3>
                <h1>{t(weather.name)}</h1>
              </div>
              <Divider style={{backgroundColor:"black"}}/>
              <div className='content' style={{textAlign:"right" , marginRight:"30px"}}>
               <div className='text' style={{display:"flex"  ,flexDirection:"row-reverse" , justifyContent:"space-between"}}>
                <div>
                  <div style={{display:"flex" , justifyContent:"center" , alignItems:"center"}}>
                  <img/>
                  <h1 style={{fontSize:"50px"}}>{weatherdata.tem}<span>cْ</span></h1>
                  </div>
                  <h3>{t(weatherdata.description)}</h3>  
                  <div>
                  <h3>  🌗 {t("Min Temperature")} : {weatherdata.minvalue}</h3>
                  <h3>   🌕 {t("Max Temperature")} : {weatherdata.maxvalue}</h3>
                  <h3>    💨 {t("wind Speed")} : {weatherdata.windSpeed}</h3>

                </div>
                </div>
                <div style={{fontSize:"100px"}}>  
                  🌦
                </div>
              </div>
              </div>
        </div>
        <button  className='btn' onClick={handleLanguageClicked}>{local === "ar" ? "English": "عربي" }</button>
          <br/>
          <input
           type='text' 
           style={{textAlign:"center"}} 
           placeholder={t("Enter your countery")}
           value={search}   
           onChange={(e)=>{
            setSearch(e.target.value)
           }}
           /> 
          <button
           className='search'
           onClick={handleSearchClicked}
           >{t("Search")}</button>
      </Container>
           <p className='para' style={{backgroundColor:"green" , borderRadius:"10px" , padding:"10px"}}>ملاحظة ☺ لو بتبحث عن دولة بالأنجلش ومش بتظهرهتكتب الأسم بالعربي والعكس</p>
</>
  )
}

export default App
