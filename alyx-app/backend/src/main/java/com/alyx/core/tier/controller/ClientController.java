package com.alyx.core.tier.controller;

import com.alyx.common.controller.GenericController;
import com.alyx.core.tier.dto.ClientDto;
import com.alyx.core.tier.service.ClientService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/client")
@CrossOrigin(origins = "*")
public class ClientController extends GenericController<ClientDto, Long> {

    public ClientController(ClientService service) {
        super(service);
    }
}
