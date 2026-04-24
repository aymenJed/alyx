package com.alyx.security.service;

import com.alyx.auth.entity.AppUser;
import com.alyx.auth.repository.AppUserRepository;
import com.alyx.core.common.PagedResponse;
import com.alyx.security.dto.AssignRoleRequest;
import com.alyx.security.dto.UserAssignmentDto;
import com.alyx.security.entity.Role;
import com.alyx.security.entity.UserRoleAssignment;
import com.alyx.security.repository.RoleRepository;
import com.alyx.security.repository.UserRoleAssignmentRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserRoleAssignmentService {

    private final UserRoleAssignmentRepository assignmentRepo;
    private final AppUserRepository            userRepo;
    private final RoleRepository               roleRepo;

    public UserRoleAssignmentService(UserRoleAssignmentRepository assignmentRepo,
                                     AppUserRepository userRepo,
                                     RoleRepository roleRepo) {
        this.assignmentRepo = assignmentRepo;
        this.userRepo       = userRepo;
        this.roleRepo       = roleRepo;
    }

    // ── READ ─────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public PagedResponse<UserAssignmentDto> findAll(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        var p = (search == null || search.isBlank())
            ? assignmentRepo.findAll(pageable)
            : assignmentRepo.search(search, pageable);
        return PagedResponse.of(p.map(UserRoleAssignmentService::toDto));
    }

    @Transactional(readOnly = true)
    public UserAssignmentDto findById(Long id) {
        return assignmentRepo.findById(id)
            .map(UserRoleAssignmentService::toDto)
            .orElseThrow(() -> new RuntimeException("Affectation introuvable : " + id));
    }

    // ── CREATE (assign user → role) ──────────────────────────────

    public UserAssignmentDto create(AssignRoleRequest req) {
        if (assignmentRepo.existsByUser_IdAndRole_Id(req.userId(), req.roleId())) {
            throw new RuntimeException("L'utilisateur " + req.userId()
                    + " possède déjà le rôle " + req.roleId());
        }

        AppUser user = userRepo.findById(req.userId())
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable : " + req.userId()));
        Role role = roleRepo.findById(req.roleId())
            .orElseThrow(() -> new RuntimeException("Rôle introuvable : " + req.roleId()));

        UserRoleAssignment assignment = new UserRoleAssignment(user, role, null);
        return toDto(assignmentRepo.save(assignment));
    }

    // ── DELETE (unassign) ────────────────────────────────────────

    public void delete(Long id) {
        if (!assignmentRepo.existsById(id)) {
            throw new RuntimeException("Affectation introuvable : " + id);
        }
        assignmentRepo.deleteById(id);
    }

    // ── MAPPING ──────────────────────────────────────────────────

    private static UserAssignmentDto toDto(UserRoleAssignment a) {
        return new UserAssignmentDto(
            a.getAssignmentId(),
            a.getUser() != null ? a.getUser().getUserId()   : null,
            a.getUser() != null ? a.getUser().getUsername() : null,
            a.getUser() != null ? a.getUser().getFullName() : null,
            a.getRole() != null ? a.getRole().getRoleId()   : null,
            a.getRole() != null ? a.getRole().getRoleName() : null,
            a.getCreatedBy(),
            a.getCreatedAt()
        );
    }
}
