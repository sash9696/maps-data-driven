"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMapProvider,
  useAutocomplete,
  useGoogleMap,
} from "@ubilabs/google-maps-react-hooks";
import zones from "../data/zones";
// import colors from "../data/colors";
import axios from "axios";

function generateRandomColor() {
  // Generate random values for red, green, and blue components
  const red = Math.floor(Math.random() * 256); // Random value between 0 and 255
  const green = Math.floor(Math.random() * 256); // Random value between 0 and 255
  const blue = Math.floor(Math.random() * 256); // Random value between 0 and 255
  
  // Construct the color in hexadecimal format
  const color = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
  
  return color;
}

const newObj = {}
const colors = {};

const transformedData = [
  {
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    postalcode: 400001,
    population: 18414288,
    sales: 1200000, // Example sales amount in INR
  },
  {
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    postalcode: 411001,
    population: 3115431,
    sales: 690000, // Example sales amount in INR
  },
  {
    city: "Nagpur",
    state: "Maharashtra",
    country: "India",
    postalcode: 440001,
    population: 2405665,
    sales: 580000, // Example sales amount in INR
  },
  {
    city: "Nashik",
    state: "Maharashtra",
    country: "India",
    postalcode: 422001,
    population: 1486053,
    sales: 480000, // Example sales amount in INR
  },
  {
    city: "Thane",
    state: "Maharashtra",
    country: "India",
    postalcode: 400601,
    population: 1818872,
    sales: 550000, // Example sales amount in INR
  },
  {
    city: "Aurangabad",
    state: "Maharashtra",
    country: "India",
    postalcode: 431001,
    population: 1171330,
    sales: 510000, // Example sales amount in INR
  },
  {
    city: "Solapur",
    state: "Maharashtra",
    country: "India",
    postalcode: 413001,
    population: 951558,
    sales: 450000, // Example sales amount in INR
  },
  {
    city: "Amravati",
    state: "Maharashtra",
    country: "India",
    postalcode: 444601,
    population: 646801,
    sales: 380000, // Example sales amount in INR
  },
  {
    city: "Navi Mumbai",
    state: "Maharashtra",
    country: "India",
    postalcode: 400701,
    population: 1082509,
    sales: 620000, // Example sales amount in INR
  },
  {
    city: "Kolhapur",
    state: "Maharashtra",
    country: "India",
    postalcode: 416001,
    population: 561841,
    sales: 420000, // Example sales amount in INR
  },
  {
    city: "Latur",
    state: "Maharashtra",
    country: "India",
    postalcode: 413512,
    population: 484467,
    sales: 360000, // Example sales amount in INR
  },
  {
    city: "Akola",
    state: "Maharashtra",
    country: "India",
    postalcode: 444001,
    population: 537548,
    sales: 390000, // Example sales amount in INR
  },
  {
    city: "Ahmednagar",
    state: "Maharashtra",
    country: "India",
    postalcode: 414001,
    population: 379450,
    sales: 340000, // Example sales amount in INR
  },
  {
    city: "Chandrapur",
    state: "Maharashtra",
    country: "India",
    postalcode: 442401,
    population: 389382,
    sales: 370000, // Example sales amount in INR
  },
  {
    city: "Jalgaon",
    state: "Maharashtra",
    country: "India",
    postalcode: 425001,
    population: 460468,
    sales: 410000, // Example sales amount in INR
  },
  {
    city: "Satara",
    state: "Maharashtra",
    country: "India",
    postalcode: 415001,
    population: 325881,
    sales: 330000, // Example sales amount in INR
  },
  {
    city: "Sangli",
    state: "Maharashtra",
    country: "India",
    postalcode: 416416,
    population: 511921,
    sales: 440000, // Example sales amount in INR
  },
  {
    city: "Wardha",
    state: "Maharashtra",
    country: "India",
    postalcode: 442001,
    population: 105543,
    sales: 270000, // Example sales amount in INR
  },
  {
    city: "Gondia",
    state: "Maharashtra",
    country: "India",
    postalcode: 441601,
    population: 134303,
    sales: 280000, // Example sales amount in INR
  },
  {
    city: "Bhusawal",
    state: "Maharashtra",
    country: "India",
    postalcode: 425201,
    population: 187421,
    sales: 300000, // Example sales amount in INR
  }
  // Add more cities from Maharashtra as needed
];

// const transformedData = [
//   {
//     city: "NYC",
//     country: "USA",
//     customername: "Land of Toys Inc.",
//     dealsize: "Small",
//     postalcode: 10022,
//     productcode: "S10_1678",
//     sales: 2871,
//     state: "NY",
//     territory: "NA",
//   },
//   {
//     city: "Reims",
//     country: "France",
//     customername: "Reims Collectables",
//     dealsize: "Small",
//     postalcode: 51100,
//     productcode: "S10_1678",
//     sales: 2765.9,
//     state: "",
//     territory: "EMEA",
//   },
// ];
// const transformedData = [
//   {
//     city: "Mumbai",
//     state: "Maharashtra",
//     country: "India",
//     postalcode: 400001,
//     population: 18414288,
//     sales: 1200000, // Example sales amount in INR
//   },
//   {
//     city: "Delhi",
//     state: "Delhi",
//     country: "India",
//     postalcode: 110001,
//     population: 11007835,
//     sales: 950000, // Example sales amount in INR
//   },
//   {
//     city: "Bangalore",
//     state: "Karnataka",
//     country: "India",
//     postalcode: 560001,
//     population: 8443675,
//     sales: 850000, // Example sales amount in INR
//   },
//   {
//     city: "Chennai",
//     state: "Tamil Nadu",
//     country: "India",
//     postalcode: 600001,
//     population: 7088000,
//     sales: 720000, // Example sales amount in INR
//   },
//   {
//     city: "Kolkata",
//     state: "West Bengal",
//     country: "India",
//     postalcode: 700001,
//     population: 4631392,
//     sales: 620000, // Example sales amount in INR
//   },
//   {
//     city: "Hyderabad",
//     state: "Telangana",
//     country: "India",
//     postalcode: 500001,
//     population: 6809970,
//     sales: 780000, // Example sales amount in INR
//   },
//   {
//     city: "Pune",
//     state: "Maharashtra",
//     country: "India",
//     postalcode: 411001,
//     population: 3115431,
//     sales: 690000, // Example sales amount in INR
//   },
//   // Add more data as needed
// ];

// Function to generate random sales data
function generateRandomSalesData() {
  return Math.floor(Math.random() * 100000); // Generating random sales value between 0 and 9999
}

// Object with location IDs and random sales data
const salesData = {
  "ChIJEW1uQjAf1DsR6X0BBh4pKWs": generateRandomSalesData(),
  "ChIJPxWoniJk1DsRVug16JeNA04": generateRandomSalesData(),
  "ChIJHRr6I-0O1DsRD8n0Tgm8UUo": generateRandomSalesData(),
  "ChIJLQR_U3Z11DsRv0kgFJWQLLM": generateRandomSalesData(),
  "ChIJ1bFgZdPw0zsRJFdHOtmJkl8": generateRandomSalesData(),
  "ChIJkQjf1OwH1DsRmKx5ZFKA6YQ": generateRandomSalesData(),
  "ChIJ_bkXzacV1DsRU0h5CNT59ic": generateRandomSalesData(),
  "ChIJtWwB800C1DsRsk-JEdgytos": generateRandomSalesData(),
  "ChIJMTGwUHOL0zsRZUp1XO0sBRg": generateRandomSalesData(),
  "ChIJkzKy6Ap01DsR85tFc14a4Cs": generateRandomSalesData(),
  "ChIJzTzVa5MM1DsRSc6FojQICtA": generateRandomSalesData(),
  "ChIJVTtvVV-P0zsRZt6ichOJNHA": generateRandomSalesData(),
  "ChIJW1ph5_J_1DsRSXpjb4XBvGI": generateRandomSalesData(),
  "ChIJU8fFOE2G1DsRd2hRVeHBNJs": generateRandomSalesData(),
  "ChIJOfvMpx940zsRWQiWL4dkmEQ": generateRandomSalesData(),
  "ChIJI36c_1mQ1DsRYVb5WOZwqC0": generateRandomSalesData(),
  "ChIJ1fQpjcl90zsRWMsTReAUvsQ": generateRandomSalesData(),
  "ChIJdaFe0leH0zsRIAwjoDwvJcI": generateRandomSalesData(),
  "ChIJNS9PM35-1DsRDx1Mwdsg_98": generateRandomSalesData(),
  "ChIJ7Qt_L6dd0zsRQgS-4x6LNVA": generateRandomSalesData(),
  "ChIJRzxJHOyi1DsRnV9kcalycIk": generateRandomSalesData(),
  "ChIJR1K8auqr1DsRV5UoZLdhFvI": generateRandomSalesData(),
  "ChIJl_UW_VGc1DsRfRkpNeUqwgU": generateRandomSalesData(),
  "ChIJd2KABzZQKzoRFOPfcHJG7hc": generateRandomSalesData(),
  "ChIJXSbfaJ9OKzoRevxnvZwXNGM": generateRandomSalesData(),
  "ChIJgbCS9ctQ0zsRBXJLw6C_CE4": generateRandomSalesData(),
  "ChIJ2ewn7gWqLDoRYAJryMYYYP8": generateRandomSalesData(),
  "ChIJKTHfbpOw1DsRGwYyMATAfU4": generateRandomSalesData(),
  "ChIJy4j0idlM0zsRZykFs3DOke0": generateRandomSalesData(),
  "ChIJT5-susWdLDoRSTgR1nMH_4E": generateRandomSalesData(),
  "ChIJ24BP1JSkLDoRguDqMBdH2ns": generateRandomSalesData(),
  "ChIJvb2MQ4BgKzoRx1QxUb6JLZk": generateRandomSalesData(),
  "ChIJPeXNJIZBKzoRFF4pF_iQk1A": generateRandomSalesData(),
  "ChIJc3OCC3tdKzoReHLh8LpEAPI": generateRandomSalesData(),
  "ChIJx1kYPDmnLDoReF9aaCYYt0A": generateRandomSalesData(),
  "ChIJazkpmuCTLDoRXBxQqLJiS-o": generateRandomSalesData(),
  "ChIJWTu3r7Kk0zsR0wb8WOe7JiA": generateRandomSalesData(),
  "ChIJscfxKLaT0zsRQwofGRoTh2E": generateRandomSalesData(),
  "ChIJT6_GaQ3v0zsRk0pUg2tXo_o": generateRandomSalesData(),
  "ChIJE7k4Kh-Z0zsRSvxbT3EYM8g": generateRandomSalesData(),
  "ChIJe-PimfPb0zsRP59ts-cSN8E": generateRandomSalesData(),
  "ChIJbzWB4sVX0TsRD3x9PZ2tsWE": generateRandomSalesData(),
  "ChIJ_RbhJnjC0zsRY4wH0KIuzts": generateRandomSalesData(),
  "ChIJPe2hhh8K0zsRysmjzIjHEsw": generateRandomSalesData(),
  "ChIJvcB6SJp00zsRws-WD-AxFMg": generateRandomSalesData(),
  "ChIJjUSH5FsU0zsRbmP_vQljqBA": generateRandomSalesData(),
  "ChIJXfq7Yt810zsRp2vU9bAoz9E": generateRandomSalesData(),
  "ChIJET0wdgc_0zsRpspQlDtMzWA": generateRandomSalesData(),
  "ChIJ3RL07yFv0zsRAAVdQejQCcA": generateRandomSalesData(),
  "ChIJ4xp1XWa2LDoRzpWaYSbn4nI": generateRandomSalesData(),
  "ChIJ5xM0zejILDoRIn74n77I9Uo": generateRandomSalesData(),
  "ChIJXTQ43xfQLDoRULvDVaky928": generateRandomSalesData(),
  "ChIJhapXoQG_LDoRoUmt0ulGrXE": generateRandomSalesData(),
  "ChIJmzhBns3oLDoRM1Ob6WIFBIw": generateRandomSalesData()
};

console.log(salesData);

const mapOptions = {
  zoom: 10,
  center: {
    lat: 20.5937,
    lng: 78.9629,
  },
  mapId: process.env.NEXT_PUBLIC_MAP_ID,
};

const apiKey = process.NEXT_PUBLIC_MAP_API_KEY; // Replace with your actual API key
const placeId = "ChIJdf5LHzR_hogR6czIUzU0VV4"; // Example Place ID

const selectedCriteria = ["city", "sales"]; // User-selected criteria

export default function Index() {
  const [mapContainer, setMapContainer] = useState();
  const [aggregatedResult, setAggregatedResult] = useState(null);

  console.log("abcde", aggregatedResult);
  const onLoad = useCallback(
    (map) => {
      if (aggregatedResult) {
        console.log("onLoad running");
        addZoneLayer(map, aggregatedResult);
      }
    },
    [aggregatedResult]
  );

  const handleButtonClick = () => {
    aggregateDataByCriteriaAndPlaceId(transformedData, selectedCriteria)
      .then((result) => {
        console.log("Aggregated Result:", result);
        setAggregatedResult(result); // Update aggregated result
      })
      .catch((error) => {
        console.error("Error while aggregating data:", error);
      });
  };

  return (
    <>
      {aggregatedResult && Object.keys(colors).length > 0 && (
        <GoogleMapProvider
          options={mapOptions}
          googleMapsAPIKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
          mapContainer={mapContainer}
          version="beta"
          onLoad={onLoad}
          libraries={["places"]}
        >
          <div
            ref={(node) => setMapContainer(node)}
            style={{ height: "100vh", width: "80%" }}
          />
          <AutoComplete />
        </GoogleMapProvider>
      )}
      <button onClick={handleButtonClick}>Click me</button>
    </>
  );
}

function AutoComplete() {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [position, setPosition] = useState();
  const { map } = useGoogleMap();

  useEffect(() => {
    if (!position || !map) return;
    map.setCenter(position);
    map.setZoom(12);
  }, [position, map]);

  useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged: (place) => {
      if (!place) return;
      setInputValue(place.formatted_address || place.name);
      setPosition({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    },
  });

  return (
    <input
      ref={inputRef}
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
    />
  );
}

function addZoneLayer(map, aggregatedResult) {
  console.log("addZoneLayer called");
  if (!map.getMapCapabilities().isDataDrivenStylingAvailable) return;

  const featureLayer = map.getFeatureLayer("LOCALITY");

  featureLayer.style =({ feature }) => {
    const placeId = feature.placeId; // Assuming feature.placeId holds the Place ID
    // const placeDetails = await getPlaceDetails(placeId); // Call the function to get place details
    // console.log('placeDetails',placeDetails?.address_components[0]?.long_name
    // );
    console.log("addZoneLayer", {aggregatedResult,placeId,feature});
    
    const sales = aggregatedResult[placeId];

    // const sales = salesData[placeId];
    // newObj[placeId] = null
    // console.log('12345',{sales})
    // if (!zone) return;

    // console.log('newObj',{newObj})
    if(!sales) return;

    let fillColor;
    console.log('sales',{sales,placeId})

    // Specify colors using any of the following:m
    
    // * Named ('green')
    // * Hexadecimal ('#FF0000')
    // * RGB ('rgb(0, 0, 255)')
    // * HSL ('hsl(60, 100%, 50%)')
    // if (sales < 100000) {
    //   fillColor = "green";
    // } else if (sales < 50000) {
    //   fillColor = "red";
    // } else if (sales < 500000) {
    //   fillColor = "blue";
    // } else if (sales > 900000) {
    //   fillColor = "yellow";
    // }
    // console.log('fillColor',fillColor)
    // return {
    //   fillColor,
    //   fillOpacity: 0.5,
    // };
    console.log('fillColor',colors[placeId])
    return {
      fillColor: colors[placeId],
      fillOpacity: 0.5,
    };
  };

  const infoWindow = new google.maps.InfoWindow();

  // featureLayer.addListener("click", async (event) => {
  //   const feature = event.features[0];
  //   const placeId = feature.placeId; // Assuming feature.placeId holds the Place ID
  //   const placeDetails = await getPlaceDetails(placeId); // Call the function to get place details
  //   console.log("placeDetails", placeDetails);
  //   const zone = placeDetails ? zones[placeId] : null;
  //   if (!zone) return;

  //   infoWindow.setPosition(event.latLng);
  //   infoWindow.setContent(`
  //     <div class="info-window">
  //       <h2>Zone ${zone}</h2>
  //       <p>Place ${placeId} is USDA Zone ${zone}.</p>
  //     </div>
  //   `);
  //   infoWindow.open({ map });
  // });

  // Function to get place details
}
async function getPlaceDetails(key) {
  try {
    const response = await fetch(`/api/place-details?key=${key}`);
    const data = await response.json();
    console.log("data", data);
    // 
    return data.candidates[0].place_id; // Assuming the API response has place details
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
}
// Function to aggregate data by selected criteria and get place IDs
async function aggregateDataByCriteriaAndPlaceId(data, selectedCriteria) {
  const aggregatedData = {};

  for (const entry of data) {
    const key = entry[selectedCriteria[0]]; // Use the first selected criteria as the key
    const value = entry[selectedCriteria[1]]; // Use the second selected criteria as the value

    // Get place ID from key
    const placeId = await getPlaceDetails(key);

    colors[placeId] = generateRandomColor();
    // Add place ID to aggregated data object
    console.log("placeId", placeId);
    if (placeId) {
      aggregatedData[placeId] = value;
    }
  }

  return aggregatedData;
}
