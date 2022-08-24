package idv.victor.service;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.googleapis.services.CommonGoogleClientRequestInitializer;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarRequestInitializer;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;

@Service
public class APIService {

    public void getCalendarInfo () throws GeneralSecurityException, IOException {
        // initialize google service builder
        CommonGoogleClientRequestInitializer initializer = CalendarRequestInitializer.newBuilder().setKey("").build();
        NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
        Calendar service = new Calendar.Builder(HTTP_TRANSPORT,JSON_FACTORY,null).setGoogleClientRequestInitializer(initializer).build();

    }
}
