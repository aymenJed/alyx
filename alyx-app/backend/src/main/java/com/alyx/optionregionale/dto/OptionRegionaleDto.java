package com.alyx.optionregionale.dto;

import com.alyx.optionregionale.entity.OptionRegionale;

public record OptionRegionaleDto(
    Long   optionId,
    String nom,
    String langue,
    String formatNombre,
    String formatDate,
    String symboleDecimal,
    String symboleGroupement,
    String formatHoraire,
    String timezone,
    Boolean isActive
) {
    public static OptionRegionaleDto from(OptionRegionale o) {
        return new OptionRegionaleDto(
            o.getOptionId(),
            o.getNom(),
            o.getLangue(),
            o.getFormatNombre(),
            o.getFormatDate(),
            o.getSymboleDecimal(),
            o.getSymboleGroupement(),
            o.getFormatHoraire(),
            o.getTimezone(),
            o.getIsActive()
        );
    }
}
