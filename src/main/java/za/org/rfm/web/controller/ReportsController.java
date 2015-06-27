package za.org.rfm.web.controller;

import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import za.org.rfm.model.Report;

/**
 * Created by Russel on 2015-06-27.
 */
@RestController
@RequestMapping("/report")
public class ReportsController {

    Gson gson = new Gson();

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity create(@RequestBody String report) {
        System.out.println(report);
        Report reportObj = gson.fromJson(report,Report.class);
        return new ResponseEntity(HttpStatus.OK);
    }

}
