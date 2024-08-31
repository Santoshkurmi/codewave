import { create } from "zustand";

interface Config{
    isRightNavHidden:boolean;
    setRightNav:(state?:boolean) =>void;
    isHeaderNavHidden:boolean;
    setHeaderNav:(state?:boolean) =>void;
    isLeftNavHidden:boolean;
    setLeftNav:(state?:boolean) =>void;
    isDark:boolean;
    setDarkTheme:(state?:boolean) =>void;
}

const theme = localStorage.getItem("theme");


function toggleTheme(isDark:boolean){
    if(isDark){
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme','');
    }//
    else {
    document.documentElement.classList.add('dark');
        localStorage.setItem("theme","dark");
    }
}



const ConfigStore = create<Config>()(set=>(
    {
    isRightNavHidden:false,
    setRightNav(value){
        set(state=>{
            if(value!=undefined)
                return {isRightNavHidden:value};
            else return {isRightNavHidden:!state.isRightNavHidden};
        })
    },
    isHeaderNavHidden:false,
    setHeaderNav(value){
        set(state=>{
            if(value!=undefined)
                return {isHeaderNavHidden:value};
            else return {isHeaderNavHidden:!state.isHeaderNavHidden};
        })
    },

    isLeftNavHidden:false,
    setLeftNav(value){
        set(state=>{
            if(value!=undefined)
                return {isLeftNavHidden:value};
            else return {isLeftNavHidden:!state.isLeftNavHidden};
        })
    },

    isDark: theme == "dark" ?true: false,
    setDarkTheme(value) {
        set(state=>{
            if(value==undefined){
                toggleTheme(state.isDark);
                return {isDark:!state.isDark};
            } 
            else{
                toggleTheme(!value);
                return {isDark:value};

            } 
        })
    },
  
    }
));


export default ConfigStore;