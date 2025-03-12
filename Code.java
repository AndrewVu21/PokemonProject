import java.net.HttpURLConnection;
import java.util.Scanner;
import java.net.URL;

public class Code {
    public static void main(String[] args){
      try{
        URL url = new URL ("https://api.pokemontcg.io/v2/cards/base1-3");

        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");

        int response = connection.getResponseCode();

        if (response != 200){
          throw new RuntimeException("http Response Code" + response);
        } else{
          Scanner scanner= new Scanner(url.openStream());
          StringBuilder UrlResponse = new StringBuilder();
          while (scanner.hasNextLine()){
            UrlResponse.append(scanner.nextLine());
          }

          System.out.println(UrlResponse);
        }

        } catch (Exception e){
          e.printStackTrace();
        }
      } 
    
       
  }