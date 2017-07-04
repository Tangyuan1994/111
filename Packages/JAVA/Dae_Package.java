*** Je ne sais pas si ça marche vraiment (ex: pas de reconnaissance user/pwd) ***

package stage;

import java.io.*;
import java.net.*;

public class GetData {
	public static String address = "http://localhost:3000/";
	public static String id;

	public GetData() {}
	// TODO Auto-generated constructor stub

	public static String getHTML(String urlToRead) throws Exception {
		StringBuilder result = new StringBuilder();
		URL url = new URL(urlToRead);
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("GET");
		BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String line;
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}
		rd.close();
		return result.toString();
	}
	
	public static void main(String[] args) throws Exception
	{
		//System.out.println(getHTML(args[0]));
		id = "5330e2f3a0dd8ee433e3e702df012c19";
		URL url = new URL(address+ "datasets/" + id );
		URLConnection conn = url.openConnection();
		InputStream is = conn.getInputStream();
		System.out.println(is.toString());
	}
}


package stage;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.Base64;

public class Connexion {
	private static String path = "http://localhost:3000/";

	public Connexion() {	}

	public static void main(String[] args) throws Exception
	{
		String username = null;
		String password = null; 
		URL url = new URL(path + "connexion/"+ username + "/ " +password);
		String userPass = username + ":" + password;
		String basicAuth = "Basic " + new String( Base64.getEncoder().encode(userPass.getBytes()));
		HttpURLConnection urlConnection = (HttpURLConnection)url.openConnection();
		urlConnection.setRequestProperty("Authorization", basicAuth);
		urlConnection.connect();
		// TODO Auto-generated constructor stub
	}
}



