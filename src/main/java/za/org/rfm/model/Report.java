package za.org.rfm.model;

/**
 * Created by Russel on 2015-06-27.
 */
@lombok.Getter
@lombok.Setter
public class Report {
    Long assemblyId;
    String type;
    String date;
    double totalTithes,totalOffering;
    String comment;

    @Override
    public String toString() {
        return "Report{" +
                "assemblyId=" + assemblyId +
                ", type='" + type + '\'' +
                ", date='" + date + '\'' +
                ", totalTithes=" + totalTithes +
                ", totalOfferings=" + totalOffering +
                ", comment='" + comment + '\'' +
                '}';
    }
}
