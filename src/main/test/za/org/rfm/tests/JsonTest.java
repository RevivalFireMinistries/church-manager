package za.org.rfm.tests;

import com.google.gson.Gson;
import org.junit.Test;
import za.org.rfm.dto.Tithe;

import java.util.Date;

import static junit.framework.TestCase.assertFalse;

/**
 * Created by russel on 16/04/14.
 */
public class JsonTest {

    @Test
    public void testGenerateJson(){
        Gson gson = new Gson();
        Tithe tithe = new Tithe();
        tithe.amount = 100;
        tithe.fullName = "Russel Mupfumira";
        tithe.id = 1L;
        tithe.phoneNumber = "0722621278";
        tithe.txnDate = new Date();

        String jsonString = gson.toJson(tithe);
        System.out.println(jsonString);
        assertFalse(true);
    }

}


