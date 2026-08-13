-- Temporary foundation data only. Replace or remove these rows as real
-- catalogue information is entered through the admin dashboard.

insert into public.business_settings (id, business_name, whatsapp_number, opening_hours, address)
values (1, 'Emmanuel Enterprise', '+234 916 697 6985', 'Tuesday–Saturday · 8:00 AM–8:00 PM', 'Address to be confirmed')
on conflict (id) do nothing;

insert into public.categories (name, slug, description)
values
  ('General Electrical', 'general-electrical', 'Temporary sample category for initial setup.'),
  ('Tools', 'tools', 'Temporary sample category for initial setup.')
on conflict (slug) do nothing;

insert into public.products (category_id, name, slug, description, price, stock_status, featured)
select c.id, 'LED Bulb 12W', 'led-bulb-12w',
  'Temporary sample product. Replace this record with real product information.',
  0, 'on_request', true
from public.categories c
where c.slug = 'general-electrical'
on conflict (slug) do nothing;

insert into public.products (category_id, name, slug, description, price, stock_status, featured)
select c.id, 'Insulated Screwdriver Set', 'insulated-screwdriver-set',
  'Temporary sample product. Replace this record with real product information.',
  0, 'on_request', false
from public.categories c
where c.slug = 'tools'
on conflict (slug) do nothing;

-- After creating an admin user in Supabase Auth, add that user's UUID here:
-- insert into public.admin_users (user_id, display_name)
-- values ('AUTH_USER_UUID', 'Emmanuel Enterprise Admin');