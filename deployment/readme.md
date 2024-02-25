# How To Use Ansible

## Playbook Examples

```bash
# use with custom server user and password
ansible-playbook ./playbooks/deploy.yml --user {user} --ask-pass -i {inventory}

# use custom host file
ansible-playbook ./playbooks/deploy.yml -i ./inventory/host

# use default host file ./inventory/host
ansible-playbook ./playbooks/deploy.yml
```

## Host File Examples

```bash
[servers]
{ip_address}

[servers:vars]
ansible_user={username}
ansible_python_interpreter=/opt/bin/python
turnstile_secret={secret}
```
