package za.org.rfm.dto;

import lombok.Getter;
import lombok.Setter;
import org.apache.log4j.Logger;
import za.org.rfm.model.Member;

import java.util.Date;

/**
 * Created by russel on 16/04/14.
 */
@Getter
@Setter
public class Tithe {

        public static Logger logger = Logger.getLogger(Tithe.class);
        public Long id;
        public String fullName,phoneNumber;
        public Date txnDate, previousTitheDate, previousAttendanceDate;
        public double amount,previousAmount;
        public Member member;
}
