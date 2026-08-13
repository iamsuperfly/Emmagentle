-- Emmanuel Enterprise Stage 1 database foundation
-- Run this script in the Supabase SQL Editor before using the application.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text not null default '',
  price numeric(12, 2),
  stock_status text not null default 'in_stock'
    check (stock_status in ('in_stock', 'out_of_stock', 'on_request')),
  featured boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.business_settings (
  id integer primary key default 1 check (id = 1),
  business_name text not null default 'Emmanuel Enterprise',
  whatsapp_number text not null default '+234 916 697 6985',
  phone_number text not null default '',
  opening_hours text not null default 'Tuesday–Saturday · 8:00 AM–8:00 PM',
  address text not null default 'Address to be confirmed',
  logo_path text not null default '',
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists products_category_id_idx on public.products(category_id);
create index if not exists products_created_at_idx on public.products(created_at desc);
create index if not exists product_images_product_id_idx on public.product_images(product_id);

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at
before update on public.categories
for each row execute procedure public.set_updated_at();

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute procedure public.set_updated_at();

drop trigger if exists business_settings_set_updated_at on public.business_settings;
create trigger business_settings_set_updated_at
before update on public.business_settings
for each row execute procedure public.set_updated_at();

-- This function is security-definer so RLS policies can use it without
-- exposing the admin_users table to the public.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

create or replace function public.search_products(search_term text)
returns setof public.products
language sql
stable
security invoker
set search_path = public
as $$
  select p.*
  from public.products p
  left join public.categories c on c.id = p.category_id
  where nullif(trim(search_term), '') is null
     or p.name ilike '%' || trim(search_term) || '%'
     or p.description ilike '%' || trim(search_term) || '%'
     or c.name ilike '%' || trim(search_term) || '%'
  order by p.created_at desc;
$$;

grant execute on function public.search_products(text) to anon, authenticated;

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.business_settings enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Public can read categories" on public.categories;
create policy "Public can read categories"
on public.categories for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage categories" on public.categories;
create policy "Admins can manage categories"
on public.categories for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
on public.products for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage products" on public.products;
create policy "Admins can manage products"
on public.products for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read product images" on public.product_images;
create policy "Public can read product images"
on public.product_images for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage product images" on public.product_images;
create policy "Admins can manage product images"
on public.product_images for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read business settings" on public.business_settings;
create policy "Public can read business settings"
on public.business_settings for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage business settings" on public.business_settings;
create policy "Admins can manage business settings"
on public.business_settings for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can see their own admin record" on public.admin_users;
create policy "Admins can see their own admin record"
on public.admin_users for select
to authenticated
using (user_id = auth.uid());

-- Storage bucket and policies for public catalogue images.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'product-images');

drop policy if exists "Admins can upload product images" on storage.objects;
create policy "Admins can upload product images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Admins can update product images" on storage.objects;
create policy "Admins can update product images"
on storage.objects for update
to authenticated
using (bucket_id = 'product-images' and public.is_admin())
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Admins can delete product images" on storage.objects;
create policy "Admins can delete product images"
on storage.objects for delete
to authenticated
using (bucket_id = 'product-images' and public.is_admin());