import java.net.HttpURLConnection;
import java.util.Scanner;
import java.net.URL;

public class Code {
    public static void main(String[] args){
      try{
        Scanner Userinp = new Scanner(System.in); // Opened a scanner for user input

        System.out.println("Enter Base card ID (base1-1 and etc)");
        String BcID = Userinp.nextLine(); // gets the user input for base card
        Userinp.close(); // closes scanner
        URL url = new URL ("https://api.pokemontcg.io/v2/cards/" + BcID); // creates a Url object that allows you to modify with the user input

        HttpURLConnection connection = (HttpURLConnection) url.openConnection(); // connecting to the API
        connection.setRequestMethod("GET");

        int response = connection.getResponseCode(); // creates a int variable for response code

        // below is testing the response to the URL if its not 200 then it wil fail and add the error response connection number 
        if (response != 200){
          throw new RuntimeException("http Response Code" + response);
        } else{ // if it passes connection it will gather the information from the URL and will print the response from the URL.
          Scanner urlInfo = new Scanner(url.openStream()); 
          StringBuilder UrlResponse = new StringBuilder();
          while (urlInfo.hasNextLine()){
            UrlResponse.append(urlInfo.nextLine());
          }
          urlInfo.close();
          System.out.println(UrlResponse);
        }

        } catch (Exception e){
          e.printStackTrace();
        }
      } 
    
       
  }