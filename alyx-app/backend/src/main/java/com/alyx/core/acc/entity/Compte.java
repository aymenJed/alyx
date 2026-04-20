package com.alyx.core.acc.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.alyx.common.entity.BaseEntity;
import java.util.List;
import java.util.ArrayList;
import com.alyx.core.tier.entity.Client;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "compte")
public class Compte extends BaseEntity {

    @Column(name = "acc_number")
    private String accNumber;

    @OneToMany(mappedBy = "compte")
    private List<Client> clients = new ArrayList<>();

}
