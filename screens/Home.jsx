import { Box, Text, VStack, Button, HStack, Avatar, Icon } from "native-base";

const Home = ({ navigation }) => {
  
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <VStack space={2}>
        <Text>You're Home</Text>
        <Button onPress={() => navigation.navigate("About")}>Go to About</Button>
      </VStack>
    </Box>
  );

}
export default Home;
