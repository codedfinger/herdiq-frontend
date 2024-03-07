import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/main/HomeScreen';
import WelcomeScreen from '../screens/main/WelcomeScreen';
import LoginScreen from '../screens/main/LoginScreen';
import SignUpScreen from '../screens/main/SignUpScreen';
import DashboardScreen from '../screens/main/DashboardScreen';
import MainScreen from '../screens/main/MainScreen'

import GoatScreen from '../screens/GoatScreen';
import SheepScreen from '../screens/SheepScreen';
import RabbitScreen from '../screens/RabbitScreen';
import CowScreen from '../screens/CowScreen';
import PigScreen from '../screens/PigScreen';

//Goat Module
import GoatBreedListScreen from '../screens/subscreen/GoatModule/breed/BreedListScreen';
import GoatBreedScreen from '../screens/subscreen/GoatModule/breed/BreedScreen';
import GoatAnimalListScreen from '../screens/subscreen/GoatModule/animals/AnimalListScreen';
import GoatAnimalScreen from '../screens/subscreen/GoatModule/animals/AnimalScreen';
import GoatAnimalDetailsScreen from '../screens/subscreen/GoatModule/animals/AnimalDetailsScreen'
import GoatShedListScreen from '../screens/subscreen/GoatModule/sheds/ShedListScreen';
import GoatShedScreen from '../screens/subscreen/GoatModule/sheds/ShedScreen';
import GoatShedDetailsScreen from '../screens/subscreen/GoatModule/sheds/shedDetailsScreen';
import GoatVaccineListScreen from '../screens/subscreen/GoatModule/vaccine/VaccineListScreen';
import GoatVaccineScreen from '../screens/subscreen/GoatModule/vaccine/VaccineScreen';
import GoatVaccineDetailsScreen from '../screens/subscreen/GoatModule/vaccine/VaccineDetailsScreen';
import GoatProgenyScreen from '../screens/subscreen/GoatModule/progeny/ProgenyScreen';
import GoatBreedingListScreen from '../screens/subscreen/GoatModule/breeding/BreedingListScreen';
import GoatBreedingScreen from '../screens/subscreen/GoatModule/breeding/BreedingScreen';
import GoatEditBreedingScreen from '../screens/subscreen/GoatModule/breeding/editBreedingScreen';
import GoatMilkListScreen from '../screens/subscreen/GoatModule/milk/MilkListScreen';
import GoatMilkScreen from '../screens/subscreen/GoatModule/milk/MilkScreen';
import GoatEditMilkScreen from '../screens/subscreen/GoatModule/milk/editMilkScreen';

//Cow Module
import CowBreedListScreen from '../screens/subscreen/CowModule/breed/BreedListScreen';
import CowBreedScreen from '../screens/subscreen/CowModule/breed/BreedScreen';
import CowAnimalListScreen from '../screens/subscreen/CowModule/animals/AnimalListScreen';
import CowAnimalScreen from '../screens/subscreen/CowModule/animals/AnimalScreen';
import CowAnimalDetailsScreen from '../screens/subscreen/CowModule/animals/AnimalDetailsScreen'
import CowShedListScreen from '../screens/subscreen/CowModule/sheds/ShedListScreen';
import CowShedScreen from '../screens/subscreen/CowModule/sheds/ShedScreen';
import CowShedDetailsScreen from '../screens/subscreen/CowModule/sheds/shedDetailsScreen';
import CowVaccineListScreen from '../screens/subscreen/CowModule/vaccine/VaccineListScreen';
import CowVaccineScreen from '../screens/subscreen/CowModule/vaccine/VaccineScreen';
import CowVaccineDetailsScreen from '../screens/subscreen/CowModule/vaccine/VaccineDetailsScreen';
import CowProgenyScreen from '../screens/subscreen/CowModule/progeny/ProgenyScreen';
import CowBreedingListScreen from '../screens/subscreen/CowModule/breeding/BreedingListScreen';
import CowBreedingScreen from '../screens/subscreen/CowModule/breeding/BreedingScreen';
import CowEditBreedingScreen from '../screens/subscreen/CowModule/breeding/editBreedingScreen';
import CowMilkListScreen from '../screens/subscreen/CowModule/milk/MilkListScreen';
import CowMilkScreen from '../screens/subscreen/CowModule/milk/MilkScreen';
import CowEditMilkScreen from '../screens/subscreen/CowModule/milk/editMilkScreen';

//Pig Module
import PigBreedListScreen from '../screens/subscreen/PigModule/breed/BreedListScreen';
import PigBreedScreen from '../screens/subscreen/PigModule/breed/BreedScreen';
import PigAnimalListScreen from '../screens/subscreen/PigModule/animals/AnimalListScreen';
import PigAnimalScreen from '../screens/subscreen/PigModule/animals/AnimalScreen';
import PigAnimalDetailsScreen from '../screens/subscreen/PigModule/animals/AnimalDetailsScreen'
import PigShedListScreen from '../screens/subscreen/PigModule/sheds/ShedListScreen';
import PigShedScreen from '../screens/subscreen/PigModule/sheds/ShedScreen';
import PigShedDetailsScreen from '../screens/subscreen/PigModule/sheds/shedDetailsScreen';
import PigVaccineListScreen from '../screens/subscreen/PigModule/vaccine/VaccineListScreen';
import PigVaccineScreen from '../screens/subscreen/PigModule/vaccine/VaccineScreen';
import PigVaccineDetailsScreen from '../screens/subscreen/PigModule/vaccine/VaccineDetailsScreen';
import PigProgenyScreen from '../screens/subscreen/PigModule/progeny/ProgenyScreen';
import PigBreedingListScreen from '../screens/subscreen/PigModule/breeding/BreedingListScreen';
import PigBreedingScreen from '../screens/subscreen/PigModule/breeding/BreedingScreen';
import PigEditBreedingScreen from '../screens/subscreen/PigModule/breeding/editBreedingScreen';
import PigMilkListScreen from '../screens/subscreen/PigModule/milk/MilkListScreen';
import PigMilkScreen from '../screens/subscreen/PigModule/milk/MilkScreen';
import PigEditMilkScreen from '../screens/subscreen/PigModule/milk/editMilkScreen';


//Rabbit Module
import RabbitBreedListScreen from '../screens/subscreen/RabbitModule/breed/BreedListScreen';
import RabbitBreedScreen from '../screens/subscreen/RabbitModule/breed/BreedScreen';
import RabbitAnimalListScreen from '../screens/subscreen/RabbitModule/animals/AnimalListScreen';
import RabbitAnimalScreen from '../screens/subscreen/RabbitModule/animals/AnimalScreen';
import RabbitAnimalDetailsScreen from '../screens/subscreen/RabbitModule/animals/AnimalDetailsScreen'
import RabbitShedListScreen from '../screens/subscreen/RabbitModule/sheds/ShedListScreen';
import RabbitShedScreen from '../screens/subscreen/RabbitModule/sheds/ShedScreen';
import RabbitShedDetailsScreen from '../screens/subscreen/RabbitModule/sheds/shedDetailsScreen';
import RabbitVaccineListScreen from '../screens/subscreen/RabbitModule/vaccine/VaccineListScreen';
import RabbitVaccineScreen from '../screens/subscreen/RabbitModule/vaccine/VaccineScreen';
import RabbitVaccineDetailsScreen from '../screens/subscreen/RabbitModule/vaccine/VaccineDetailsScreen';
import RabbitProgenyScreen from '../screens/subscreen/RabbitModule/progeny/ProgenyScreen';
import RabbitBreedingListScreen from '../screens/subscreen/RabbitModule/breeding/BreedingListScreen';
import RabbitBreedingScreen from '../screens/subscreen/RabbitModule/breeding/BreedingScreen';
import RabbitEditBreedingScreen from '../screens/subscreen/RabbitModule/breeding/editBreedingScreen';
import RabbitMilkListScreen from '../screens/subscreen/RabbitModule/milk/MilkListScreen';
import RabbitMilkScreen from '../screens/subscreen/RabbitModule/milk/MilkScreen';
import RabbitEditMilkScreen from '../screens/subscreen/RabbitModule/milk/editMilkScreen';


//Sheep Module
import SheepBreedListScreen from '../screens/subscreen/SheepModule/breed/BreedListScreen';
import SheepBreedScreen from '../screens/subscreen/SheepModule/breed/BreedScreen';
import SheepAnimalListScreen from '../screens/subscreen/SheepModule/animals/AnimalListScreen';
import SheepAnimalScreen from '../screens/subscreen/SheepModule/animals/AnimalScreen';
import SheepAnimalDetailsScreen from '../screens/subscreen/SheepModule/animals/AnimalDetailsScreen'
import SheepShedListScreen from '../screens/subscreen/SheepModule/sheds/ShedListScreen';
import SheepShedScreen from '../screens/subscreen/SheepModule/sheds/ShedScreen';
import SheepShedDetailsScreen from '../screens/subscreen/SheepModule/sheds/shedDetailsScreen';
import SheepVaccineListScreen from '../screens/subscreen/SheepModule/vaccine/VaccineListScreen';
import SheepVaccineScreen from '../screens/subscreen/SheepModule/vaccine/VaccineScreen';
import SheepVaccineDetailsScreen from '../screens/subscreen/SheepModule/vaccine/VaccineDetailsScreen';
import SheepProgenyScreen from '../screens/subscreen/SheepModule/progeny/ProgenyScreen';
import SheepBreedingListScreen from '../screens/subscreen/SheepModule/breeding/BreedingListScreen';
import SheepBreedingScreen from '../screens/subscreen/SheepModule/breeding/BreedingScreen';
import SheepEditBreedingScreen from '../screens/subscreen/SheepModule/breeding/editBreedingScreen';
import SheepMilkListScreen from '../screens/subscreen/SheepModule/milk/MilkListScreen';
import SheepMilkScreen from '../screens/subscreen/SheepModule/milk/MilkScreen';
import SheepEditMilkScreen from '../screens/subscreen/SheepModule/milk/editMilkScreen';

import ProfileScreen from '../screens/main/Profile';
import ReportScreen from '../screens/main/Reports';
import PasswordScreen from '../screens/main/ChangePassword';

const Stack = createNativeStackNavigator();


export default function AppNavigation({ isAuthenticated, setAuthenticated }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'Dashboard' : 'Welcome'}>
        {/* main screens */}
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        <Stack.Screen name="Dashboard" options={{headerShown: false}} component={DashboardScreen} />
        <Stack.Screen name="Main" options={{headerShown: false}} component={MainScreen} />
        <Stack.Screen name="Profile" options={{headerShown: false}} component={ProfileScreen} />
        <Stack.Screen name="Reports" options={{headerShown: false}} component={ReportScreen} />
        <Stack.Screen name="Password" options={{headerShown: false}} component={PasswordScreen} />

        {/* animal screen */}
        <Stack.Screen name="Goat" options={{headerShown: false}} component={GoatScreen} />
        <Stack.Screen name="Sheep" options={{headerShown: false}} component={SheepScreen} />
        <Stack.Screen name="Rabbit" options={{headerShown: false}} component={RabbitScreen} />
        <Stack.Screen name="Cow" options={{headerShown: false}} component={CowScreen} />
        <Stack.Screen name="Pig" options={{headerShown: false}} component={PigScreen} />

        {/* sub animal screen goat */}
        <Stack.Screen name="GoatBreed" options={{headerShown: false}} component={GoatBreedListScreen} />
        <Stack.Screen name="GoatAddBreed" options={{headerShown: false}} component={GoatBreedScreen}/>
        <Stack.Screen name="GoatAnimals" options={{headerShown: false}} component={GoatAnimalListScreen}/>
        <Stack.Screen name="GoatAddAnimal" options={{headerShown: false}} component={GoatAnimalScreen}/>
        <Stack.Screen name="GoatAnimalDetails" options={{headerShown: false}} component={GoatAnimalDetailsScreen}/>
        <Stack.Screen name="GoatShed" options={{headerShown: false}} component={GoatShedListScreen} />
        <Stack.Screen name="GoatAddShed" options={{headerShown: false}} component={GoatShedScreen}/>
        <Stack.Screen name="GoatShedDetails" options={{headerShown: false}} component={GoatShedDetailsScreen}/>
        <Stack.Screen name="GoatVaccine" options={{headerShown: false}} component={GoatVaccineListScreen} />
        <Stack.Screen name="GoatAddVaccine" options={{headerShown: false}} component={GoatVaccineScreen}/>
        <Stack.Screen name="GoatVaccinesDetails" options={{headerShown: false}} component={GoatVaccineDetailsScreen}/>
        <Stack.Screen name="GoatProgeny" options={{headerShown: false}} component={GoatProgenyScreen} />
        <Stack.Screen name="GoatBreeding" options={{headerShown: false}} component={GoatBreedingListScreen} />
        <Stack.Screen name="GoatAddBreeding" options={{headerShown: false}} component={GoatBreedingScreen}/>
        <Stack.Screen name="GoateditBreeding" options={{headerShown: false}} component={GoatEditBreedingScreen}/>
        <Stack.Screen name="GoatMilk" options={{headerShown: false}} component={GoatMilkListScreen} />
        <Stack.Screen name="GoatAddMilk" options={{headerShown: false}} component={GoatMilkScreen}/>
        <Stack.Screen name="GoateditMilk" options={{headerShown: false}} component={GoatEditMilkScreen}/>

        {/* sub animal screen cow */}
        <Stack.Screen name="CowBreed" options={{headerShown: false}} component={CowBreedListScreen} />
        <Stack.Screen name="CowAddBreed" options={{headerShown: false}} component={CowBreedScreen}/>
        <Stack.Screen name="CowAnimals" options={{headerShown: false}} component={CowAnimalListScreen}/>
        <Stack.Screen name="CowAddAnimal" options={{headerShown: false}} component={CowAnimalScreen}/>
        <Stack.Screen name="CowAnimalDetails" options={{headerShown: false}} component={CowAnimalDetailsScreen}/>
        <Stack.Screen name="CowShed" options={{headerShown: false}} component={CowShedListScreen} />
        <Stack.Screen name="CowAddShed" options={{headerShown: false}} component={CowShedScreen}/>
        <Stack.Screen name="CowShedDetails" options={{headerShown: false}} component={CowShedDetailsScreen}/>
        <Stack.Screen name="CowVaccine" options={{headerShown: false}} component={CowVaccineListScreen} />
        <Stack.Screen name="CowAddVaccine" options={{headerShown: false}} component={CowVaccineScreen}/>
        <Stack.Screen name="CowVaccinesDetails" options={{headerShown: false}} component={CowVaccineDetailsScreen}/>
        <Stack.Screen name="CowProgeny" options={{headerShown: false}} component={CowProgenyScreen} />
        <Stack.Screen name="CowBreeding" options={{headerShown: false}} component={CowBreedingListScreen} />
        <Stack.Screen name="CowAddBreeding" options={{headerShown: false}} component={CowBreedingScreen}/>
        <Stack.Screen name="CoweditBreeding" options={{headerShown: false}} component={CowEditBreedingScreen}/>
        <Stack.Screen name="CowMilk" options={{headerShown: false}} component={CowMilkListScreen} />
        <Stack.Screen name="CowAddMilk" options={{headerShown: false}} component={CowMilkScreen}/>
        <Stack.Screen name="CoweditMilk" options={{headerShown: false}} component={CowEditMilkScreen}/>

        {/* sub animal screen pig */}
        <Stack.Screen name="PigBreed" options={{headerShown: false}} component={PigBreedListScreen} />
        <Stack.Screen name="PigAddBreed" options={{headerShown: false}} component={PigBreedScreen}/>
        <Stack.Screen name="PigAnimals" options={{headerShown: false}} component={PigAnimalListScreen}/>
        <Stack.Screen name="PigAddAnimal" options={{headerShown: false}} component={PigAnimalScreen}/>
        <Stack.Screen name="PigAnimalDetails" options={{headerShown: false}} component={PigAnimalDetailsScreen}/>
        <Stack.Screen name="PigShed" options={{headerShown: false}} component={PigShedListScreen} />
        <Stack.Screen name="PigAddShed" options={{headerShown: false}} component={PigShedScreen}/>
        <Stack.Screen name="PigShedDetails" options={{headerShown: false}} component={PigShedDetailsScreen}/>
        <Stack.Screen name="PigVaccine" options={{headerShown: false}} component={PigVaccineListScreen} />
        <Stack.Screen name="PigAddVaccine" options={{headerShown: false}} component={PigVaccineScreen}/>
        <Stack.Screen name="PigVaccinesDetails" options={{headerShown: false}} component={PigVaccineDetailsScreen}/>
        <Stack.Screen name="PigProgeny" options={{headerShown: false}} component={PigProgenyScreen} />
        <Stack.Screen name="PigBreeding" options={{headerShown: false}} component={PigBreedingListScreen} />
        <Stack.Screen name="PigAddBreeding" options={{headerShown: false}} component={PigBreedingScreen}/>
        <Stack.Screen name="PigeditBreeding" options={{headerShown: false}} component={PigEditBreedingScreen}/>
        <Stack.Screen name="PigMilk" options={{headerShown: false}} component={PigMilkListScreen} />
        <Stack.Screen name="PigAddMilk" options={{headerShown: false}} component={PigMilkScreen}/>
        <Stack.Screen name="PigeditMilk" options={{headerShown: false}} component={PigEditMilkScreen}/>

        {/* sub animal screen rabbit */}
        <Stack.Screen name="RabbitBreed" options={{headerShown: false}} component={RabbitBreedListScreen} />
        <Stack.Screen name="RabbitAddBreed" options={{headerShown: false}} component={RabbitBreedScreen}/>
        <Stack.Screen name="RabbitAnimals" options={{headerShown: false}} component={RabbitAnimalListScreen}/>
        <Stack.Screen name="RabbitAddAnimal" options={{headerShown: false}} component={RabbitAnimalScreen}/>
        <Stack.Screen name="RabbitAnimalDetails" options={{headerShown: false}} component={RabbitAnimalDetailsScreen}/>
        <Stack.Screen name="RabbitShed" options={{headerShown: false}} component={RabbitShedListScreen} />
        <Stack.Screen name="RabbitAddShed" options={{headerShown: false}} component={RabbitShedScreen}/>
        <Stack.Screen name="RabbitShedDetails" options={{headerShown: false}} component={RabbitShedDetailsScreen}/>
        <Stack.Screen name="RabbitVaccine" options={{headerShown: false}} component={RabbitVaccineListScreen} />
        <Stack.Screen name="RabbitAddVaccine" options={{headerShown: false}} component={RabbitVaccineScreen}/>
        <Stack.Screen name="RabbitVaccinesDetails" options={{headerShown: false}} component={RabbitVaccineDetailsScreen}/>
        <Stack.Screen name="RabbitProgeny" options={{headerShown: false}} component={RabbitProgenyScreen} />
        <Stack.Screen name="RabbitBreeding" options={{headerShown: false}} component={RabbitBreedingListScreen} />
        <Stack.Screen name="RabbitAddBreeding" options={{headerShown: false}} component={RabbitBreedingScreen}/>
        <Stack.Screen name="RabbiteditBreeding" options={{headerShown: false}} component={RabbitEditBreedingScreen}/>
        <Stack.Screen name="RabbitMilk" options={{headerShown: false}} component={RabbitMilkListScreen} />
        <Stack.Screen name="RabbitAddMilk" options={{headerShown: false}} component={RabbitMilkScreen}/>
        <Stack.Screen name="RabbiteditMilk" options={{headerShown: false}} component={RabbitEditMilkScreen}/>

        {/* sub animal screen sheep */}
        <Stack.Screen name="SheepBreed" options={{headerShown: false}} component={SheepBreedListScreen} />
        <Stack.Screen name="SheepAddBreed" options={{headerShown: false}} component={SheepBreedScreen}/>
        <Stack.Screen name="SheepAnimals" options={{headerShown: false}} component={SheepAnimalListScreen}/>
        <Stack.Screen name="SheepAddAnimal" options={{headerShown: false}} component={SheepAnimalScreen}/>
        <Stack.Screen name="SheepAnimalDetails" options={{headerShown: false}} component={SheepAnimalDetailsScreen}/>
        <Stack.Screen name="SheepShed" options={{headerShown: false}} component={SheepShedListScreen} />
        <Stack.Screen name="SheepAddShed" options={{headerShown: false}} component={SheepShedScreen}/>
        <Stack.Screen name="SheepShedDetails" options={{headerShown: false}} component={SheepShedDetailsScreen}/>
        <Stack.Screen name="SheepVaccine" options={{headerShown: false}} component={SheepVaccineListScreen} />
        <Stack.Screen name="SheepAddVaccine" options={{headerShown: false}} component={SheepVaccineScreen}/>
        <Stack.Screen name="SheepVaccinesDetails" options={{headerShown: false}} component={SheepVaccineDetailsScreen}/>
        <Stack.Screen name="SheepProgeny" options={{headerShown: false}} component={SheepProgenyScreen} />
        <Stack.Screen name="SheepBreeding" options={{headerShown: false}} component={SheepBreedingListScreen} />
        <Stack.Screen name="SheepAddBreeding" options={{headerShown: false}} component={SheepBreedingScreen}/>
        <Stack.Screen name="SheepeditBreeding" options={{headerShown: false}} component={SheepEditBreedingScreen}/>
        <Stack.Screen name="SheepMilk" options={{headerShown: false}} component={SheepMilkListScreen} />
        <Stack.Screen name="SheepAddMilk" options={{headerShown: false}} component={SheepMilkScreen}/>
        <Stack.Screen name="SheepeditMilk" options={{headerShown: false}} component={SheepEditMilkScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}