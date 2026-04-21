package com.alyx.core.acc.controller;

import com.alyx.common.controller.GenericController;
import com.alyx.core.acc.dto.CompteDto;
import com.alyx.core.acc.service.CompteService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/compte")
@CrossOrigin(origins = "*")
public class CompteController extends GenericController<CompteDto, Long> {

    public CompteController(CompteService service) {
        super(service);
    }
}
