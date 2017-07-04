                    
                    
                        GET DATA


package stage;

import java.io.*;
import java.net.*;

public class GetData {
	public static String address = "http://localhost:3000/";
	public static String id;


	public GetData() {}
	// TODO Auto-generated constructor stub


	public static void main(String[] args) throws Exception
	{
		//System.out.println(getHTML(args[0]));
		id = "5330e2f3a0dd8ee433e3e702df012c19";
		URL url = new URL(address+ "datasets/" + "all" );
		URLConnection conn = url.openConnection();
		InputStream is = conn.getInputStream();
		BufferedReader reader = new BufferedReader(new InputStreamReader(is));
		StringBuilder result = new StringBuilder();
		String line;
		while((line = reader.readLine()) != null) {
		    result.append(line);
		}
		System.out.println(result.toString());
	}
}




                          POST DATA 
                          
                          
                          
                          
package stage;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStreamWriter;

public class PostData {
	public static String address = "http://localhost:3000/";
	public static String id = "5330e2f3a0dd8ee433e3e702df012c19";
	public static int rate = 78;

	public PostData() throws IOException {}



	public static void main(String[] args) throws Exception
	{
		URL url = new URL("http://localhost:3000/document/" +id + "/addRate/" + String.valueOf(rate));
		HttpURLConnection httpCon = (HttpURLConnection) url.openConnection();
		httpCon.setDoOutput(true);
		httpCon.setRequestMethod("POST");
		OutputStreamWriter out = new OutputStreamWriter(
				httpCon.getOutputStream());
		System.out.println(httpCon.getResponseCode());
		System.out.println(httpCon.getResponseMessage());
		out.close();
	}
}



                       CONNEXION



package stage;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.Base64;

public class Connexion {
	private static String path = "http://localhost:3000/";

	public Connexion() {

	}


	public static void main(String[] args) throws Exception
	{
		String username = "capfloy77@gmail.com";
		String password = "123456"; 

		URL url = new URL(path+ "connexion/" + username + "/" + password );
		URLConnection conn = url.openConnection();
		InputStream is = conn.getInputStream();
		BufferedReader reader = new BufferedReader(new InputStreamReader(is));
		StringBuilder result = new StringBuilder();
		String line;
		while((line = reader.readLine()) != null) {
			result.append(line);
		}
		System.out.println(result.toString());
		
		/** TEST DE VALIDITE DU TOKEN **/
		
		new URL(path+ "getData/" + result.toString().substring(1, result.length()-1) );
		url.openConnection();
		InputStream is2 = conn.getInputStream();
		new BufferedReader(new InputStreamReader(is2));
		new StringBuilder();
		String line2;
		while((line2 = reader.readLine()) != null) {
			result.append(line2);

		}
	}
}

