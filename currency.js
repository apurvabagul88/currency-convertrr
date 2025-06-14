const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr=  document.querySelector(".to select");
const msg = document.querySelector(".msg");




for( let select  of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name ==="from" && currcode ==="USD"){
            newOption.selected="selected";
        }
        else if (select.name ==="to" && currcode ==="INR"){
            newOption.selected = "selected";
        }
         select.append(newOption);

        }
         select.addEventListener("change",(evt)=>{
               updateFlag(evt.target);
         });
    };

    
    const convert = async ()=>{
        let amount = document.querySelector(".amount input");
        let amtval = amount.value;
        if (amtval === ""  || amtval < 1){
            amtval = 1;
            amount.value = "1";
        }

        const apikey ="28aef338993d68e5541fca96";
        const URL = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromcurr.value} `
        let response = await fetch(URL);
        let data = await response.json();
       

         if(data.result ==="success"){

            let rate = data.conversion_rates[tocurr.value]
            let convertedAmount = amtval * rate;
            msg.innerText = `${amtval}${fromcurr.value} = ${convertedAmount.toFixed(2)}${tocurr.value}`
        }
          else{
            msg.innerText = "failed to fetch exchange rate";
          }
        }


    const updateFlag = (element)=>{
        let currcode = element.value;
        let countrycode = countryList[currcode];
        let newsrc =`https://flagsapi.com/${countrycode}/flat/64.png`;


        let img = element.parentElement.querySelector("img");
        img.src =newsrc;
    };

    btn.addEventListener("click",(nighchal)=>{
        nighchal.preventDefault();
        convert();

    })


    window.addEventListener("load",()=>{
        convert();
    });


    

    