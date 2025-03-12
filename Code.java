import java.net.HttpURLConnection;
import java.util.Scanner;
import java.net.URL;

public class Code {
    public static void main(String[] args){
      try{
        Scanner Userinp = new Scanner(System.in);

        System.out.println("Enter Base card ID (base1-1 and etc)");
        String BcID = Userinp.nextLine();
        Userinp.close();
        URL url = new URL ("https://api.pokemontcg.io/v2/cards/" + BcID);

        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        
        int response = connection.getResponseCode();

        if (response != 200){
          throw new RuntimeException("http Response Code" + response);
        } else{
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