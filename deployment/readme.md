# Ansible

## examples

### run playbook with password

```bash
ansible-playbook {playbook} --user {user} --ask-pass --ask-become-pass -i {inventory}
```

### host file

```bash
[servers]
{ip_address}

[servers:vars]
ansible_python_interpreter=/opt/bin/python
```